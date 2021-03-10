'use strict';

import _ from 'lodash';

import { dsXUser, dsXTransaction, dsXContact } from '../data';
import { bcrypt, jwt, utils, logger, esClient, mailer, googleAuth, facebookAuth } from '../libs';
import { IXUser } from '../models';

const URL_BASE: string = process.env.URL_BASE || '';

export default class XService {
  private esXUserIndex: string = 'x-user';

  private async addESDoc(body: any): Promise<any> {
    const { esXUserIndex } = this;
    const addResponse = await esClient.add(esXUserIndex, body);
    logger.info(`addESDoc() addResponse ${addResponse}`);
    return addResponse;
  }

  private async updateESDoc(user: any): Promise<any> {
    const email: string = _.get(user, 'primaryEmail', '');
    const phoneNumber: string = _.get(user, 'primaryPhoneNumber', '');
    const { esId, username = '' } = user;
    const { esXUserIndex } = this;
    const body: any = { email, phoneNumber, username, test: false };
    const updateResponse = await esClient.update(esXUserIndex, esId, body);
    logger.info(`updateESDoc() updateResponse ${updateResponse}`);
    return updateResponse;
  }

  public async signUp(email: string, phoneNumber: string, password: string): Promise<any> {
    const { esXUserIndex } = this;
    const hashPassword: string = await bcrypt.hash(password);
    const joinInAt: number = Date.now();
    const balance: number = 0;
    const id: string = utils.uuid();
    const [username = ''] = email.split('@');
    const name: string = username;
    try {
      const addResponse = await this.addESDoc({ email, phoneNumber, username, test: false });
      const esId: string = _.get(addResponse, 'body._id', '');
      logger.info(`signUp() esId ${esId}`);
      const user = await dsXUser.create({
        id,
        esId,
        primaryEmail: email,
        primaryPhoneNumber: phoneNumber,
        username,
        password: hashPassword,
        name,
        joinInAt,
        balance,
        emails: [],
        phoneNumbers: [],
        addresses: [],
        test: false
      });
      logger.info(`signUp() user ${user}`);
      await esClient.refresh(esXUserIndex);
      const token: string = jwt.sign({ primaryEmail: email });
      return { token, errorMessage: '' };
    } catch (error) {
      console.error('signUp()', error.stack);
      return { token: '', errorMessage: error.stack };
    }
  }

  public async signIn(username: string, password: string): Promise<any> {
    const user = await dsXUser.findOne(
      { $or: [{ primaryEmail: username }, { primaryPhoneNumber: username }, { username }] },
      { excludedFields: ['_id'] }
    );
    logger.info(`signIn() user ${user}`);
    if (!user || _.isEmpty(user)) {
      return { token: '', errorMessage: 'Invalid Username or Password' };
    }
    const { primaryEmail = '', password: hashPassword = '' } = user;
    const valid: boolean = await bcrypt.compare(password, hashPassword);
    if (!valid) {
      return { token: '', errorMessage: 'Invalid Username or Password' };
    }
    const token: string = jwt.sign({ primaryEmail });
    return { token, errorMessage: '' };
  }

  public async updateProfile(id: string, updateBody: any): Promise<any> {
    const excludedFields: Array<string> = ['_id', '__v', 'password'];
    logger.info(`updateProfile() id ${id} updateBody ${updateBody}`);
    const options = { excludedFields, upsert: false };
    const updatedUser = await dsXUser.updateOne({ id }, updateBody, options);
    logger.info(`updateProfile() updatedUser ${updatedUser}`);
    if (updatedUser) {
      await this.updateESDoc(updatedUser);
    }
    return updatedUser;
  }

  public async deleteUser(user: any): Promise<any> {
    const { esXUserIndex } = this;
    const { primaryEmail } = user;
    const deleteResponse = await dsXUser.deleteOne({ primaryEmail });
    const esMatch = { email: { query: primaryEmail } };
    const esDeleteResponse = await esClient.delete(esXUserIndex, esMatch);
    logger.info(`deleteUser() esDeleteResponse ${esDeleteResponse}`);
    return deleteResponse;
  }

  public async addEmail(email: string, user: any): Promise<any> {
    const { id, primaryEmail = '', emails = [] } = user;
    if (primaryEmail === email || emails.includes(email)) {
      return user;
    }
    const newEmails = emails.concat([email]);
    return await this.updateProfile(id, { emails: newEmails });
  }

  public async deleteEmail(email: string, user: any): Promise<any> {
    const { id, emails = [] } = user;
    if (!emails.includes(email)) {
      return user;
    }
    const newEmails = emails.filter((item: string) => item !== email);
    return await this.updateProfile(id, { emails: newEmails });
  }

  public async updatePrimaryEmail(email: string, user: any): Promise<any> {
    const { id, primaryEmail, emails = [] } = user;
    if (primaryEmail === email) {
      return user;
    }
    const newEmails = emails.filter((item: string) => item !== email).concat([primaryEmail]);
    const updateBody = { primaryEmail: email, emails: newEmails };
    const updatedUser = await this.updateProfile(id, updateBody);
    const token: string = jwt.sign({ primaryEmail: email });
    return { user: updatedUser, token };
  }

  public async addPhoneNumber(phoneNumber: string, user: any): Promise<any> {
    const { id, primaryPhoneNumber, phoneNumbers = [] } = user;
    if (primaryPhoneNumber === phoneNumber || phoneNumbers.includes(phoneNumber)) {
      return user;
    }
    const newPhoneNumbers = phoneNumbers.concat([phoneNumber]);
    return await this.updateProfile(id, { phoneNumbers: newPhoneNumbers });
  }

  public async deletePhoneNumber(phoneNumber: string, user: any): Promise<any> {
    const { id, phoneNumbers = [] } = user;
    if (!phoneNumbers.includes(phoneNumber)) {
      return user;
    }
    const newPhoneNumbers = phoneNumbers.filter((item: string) => item !== phoneNumber);
    return await this.updateProfile(id, { phoneNumbers: newPhoneNumbers });
  }

  public async updatePrimaryPhoneNumber(phoneNumber: string, user: any): Promise<any> {
    const { id, primaryPhoneNumber, phoneNumbers = [] } = user;
    if (primaryPhoneNumber === phoneNumber) {
      return phoneNumber;
    }
    const newPhoneNumbers = phoneNumbers
      .filter((item: string) => item !== phoneNumber)
      .concat([primaryPhoneNumber]);
    const updateBody: any = { primaryPhoneNumber: phoneNumber, phoneNumbers: newPhoneNumbers };
    const updatedUser = await this.updateProfile(id, updateBody);
    return updatedUser;
  }

  public async addAddress(address: any, user: any) {
    const { id, addresses = [] } = user;
    const addressId: string = utils.uuid();
    address = _.assign(address, { id: addressId });
    addresses.push(address);
    const updatedUser = await this.updateProfile(id, { addresses: addresses });
    return updatedUser;
  }

  public async deleteAddress(addressId: string, user: any) {
    const { id, addresses = [] } = user;
    const newAddresses = addresses.filter((address: any) => address.id !== addressId);
    const updatedUser = await this.updateProfile(id, { addresses: newAddresses });
    return updatedUser;
  }

  public async addBank(bank: any, user: any) {
    const { id, banks = [] } = user;
    const codes = banks.map(bank => bank.code);
    const { code } = bank;
    if (codes.includes(code)) {
      return user;
    }
    banks.push(bank);
    const updatedUser = await this.updateProfile(id, { banks });
    return updatedUser;
  }

  public async deleteBank(bankCode: string, user: any): Promise<any> {
    const { id, banks = [] } = user;
    const newBanks = banks.filter((bank: any) => bank.code !== bankCode);
    const updatedUser = await this.updateProfile(id, { banks: newBanks });
    return updatedUser;
  }

  public async topUp(amount: number, user: any): Promise<any> {
    const { id, balance = 0 } = user;
    const updatedUser = await this.updateProfile(id, { balance: balance + amount });
    return updatedUser;
  }

  public async withdraw(amount: number, user: any): Promise<any> {
    const { id, balance = 0 } = user;
    const updatedBalance: number = balance - amount >= 0 ? balance - amount : balance;
    const updatedUser: any = await this.updateProfile(id, { balance: updatedBalance });
    return updatedUser;
  }

  public async search(query: string): Promise<Array<any>> {
    const { esXUserIndex } = this;
    const searchQuery: Record<string, any> = {
      query: {
        bool: {
          should: [
            { wildcard: { email: { value: `*${query}*` } } },
            { wildcard: { username: { value: `*${query}*` } } },
            { wildcard: { phoneNumber: { value: `*${query}*` } } }
          ]
        }
      }
    };
    const searchResponse = await esClient.search(esXUserIndex, searchQuery);
    logger.info(`search() searchResponse ${searchResponse}`);
    const hits = _.get(searchResponse, 'body.hits.hits', []).map(item => {
      const source = _.get(item, '_source', {});
      const { email } = source;
      return { email };
    });
    return hits;
  }

  public async pay(
    fromUser: any,
    email: string,
    amount: number,
    description: string = ''
  ): Promise<any> {
    const { id: fromId, balance: fromBalance = 0 } = fromUser;
    const enoughFlag: boolean = fromBalance - amount >= 0;
    if (!enoughFlag) {
      return fromUser;
    }
    const toUser: any = await dsXUser.findOne({ primaryEmail: email });
    const { id: toId, balance: toBalance = 0 } = toUser;
    const updatedFromUser = await this.updateProfile(fromId, { balance: fromBalance - amount });
    const updatedToUser = await this.updateProfile(toId, { balance: toBalance + amount });
    logger.info(`pay() updatedToUser ${updatedToUser}`);

    const newTransaction = await this.createTransaction(fromId, toId, amount, description);
    logger.info(`pay() newTransaction ${newTransaction}`);

    return updatedFromUser;
  }

  public async sendRequest(
    toUser: any,
    email: string,
    amount: number,
    description: string
  ): Promise<any> {
    const { id: toId } = toUser;

    const fromUser: any = await dsXUser.findOne({ primaryEmail: email });
    const { id: fromId } = fromUser;

    const newTransaction = await this.createTransaction(
      fromId,
      toId,
      amount,
      description,
      'pending'
    );
    logger.info(`sendRequest() newTransaction ${newTransaction}`);

    return toUser;
  }

  public async confirmTransferRequest(fromUser: any, transactionId: string): Promise<any> {
    const { id: fromId, balance: fromBalance = 0 } = fromUser;
    const transaction = await dsXTransaction.findById(transactionId);
    const { toId, amount } = transaction;
    const enoughFlag: boolean = fromBalance - amount >= 0;
    if (!enoughFlag) {
      return fromUser;
    }
    const toUser: any = await dsXUser.findOne({ id: toId });
    const { balance: toBalance = 0 } = toUser;
    const updatedFromUser = await this.updateProfile(fromId, { balance: fromBalance - amount });
    logger.info(`confirmTransferRequest() updatedFromUser ${updatedFromUser}`);
    const updatedToUser = await this.updateProfile(toId, { balance: toBalance + amount });
    logger.info(`confirmTransferRequest() updatedToUser ${updatedToUser}`);

    const updatedTransaction = await dsXTransaction.updateById(transactionId, {
      status: 'completed'
    });

    return updatedTransaction;
  }

  private async createTransaction(
    fromId: string,
    toId: string,
    amount: number,
    description: string = '',
    status: string = 'completed'
  ): Promise<any> {
    const d: Date = new Date();
    const year: number = d.getFullYear();
    const month: number = d.getMonth() + 1;
    const date: number = d.getDate();
    const hour: number = d.getHours();
    const minute: number = d.getMinutes();
    const timestamp: number = d.getTime();
    const newTransaction = {
      fromId,
      toId,
      status,
      amount,
      description,
      year,
      month,
      date,
      hour,
      minute,
      timestamp
    };
    return await dsXTransaction.create(newTransaction);
  }

  public async getTransactions(user: any, options): Promise<Array<any>> {
    const { skip = 0, limit = 10 } = options;
    const { id } = user;
    const transactions = await dsXTransaction.find(
      { $or: [{ fromId: id }, { toId: id }] },
      { skip, limit, sort: { timestamp: -1 } }
    );
    return transactions;
  }

  public async getContacts(user: any): Promise<Array<any>> {
    const { id } = user;
    const contacts: Array<any> = await dsXContact.find({
      status: 'active',
      $or: [{ fromId: id }, { toId: id }]
    });
    const fromIds = contacts.map(contact => contact.fromId).filter(userId => userId !== id);
    const toIds = contacts.map(contact => contact.toId).filter(userId => userId !== id);
    const ids: Array<string> = _.uniq([].concat(fromIds, toIds));
    const users: Array<any> = await dsXUser.find(
      { id: { $in: ids } },
      { selectedFields: ['name', 'primaryEmail'], sort: { primaryEmail: 1 } }
    );
    return users;
  }

  public async getPendingContacs(user: any): Promise<Array<any>> {
    const { id } = user;
    const contacts: Array<any> = await dsXContact.find(
      { status: 'pending', toId: id },
      { excludedFields: ['__v'] }
    );
    const fromIds: Array<string> = contacts.map(contact => contact.fromId);
    const users: Array<any> = await dsXUser.find(
      { id: { $in: fromIds } },
      { selectedFields: ['id', 'name'] }
    );
    return contacts.map((contact: any) => {
      const { fromId } = contact;
      const { name = '' } = users.find(user => user.id === fromId) || {};
      const description: string = `${name} sends you a contact request.`;
      contact = Object.assign(contact, { name, description });
      return contact;
    });
  }

  public async addContact(user: any, toEmail: string): Promise<any> {
    const { id: fromId } = user;
    const toUser = await dsXUser.findOne({ primaryEmail: toEmail });
    const { id: toId } = toUser;
    if (fromId === toId) return { message: 'You cannot add yourself' };
    const timestamp: number = Date.now();
    const newContact = await dsXContact.create({ fromId, toId, status: 'pending', timestamp });
    return newContact;
  }

  public async confirmContactRequest(toUser: any, notificationId: string): Promise<any> {
    const { id } = toUser;
    const contact = await dsXContact.findById(notificationId);
    const { toId } = contact;
    if (id !== toId) {
      logger.info(`confirmContactRequest() Users are not match`);
      return;
    }
    const updatedContact = await dsXContact.updateById(notificationId, { status: 'active' });
    return updatedContact;
  }

  public async forgetPassword(email: string): Promise<string> {
    const user: IXUser = await dsXUser.findOne({ primaryEmail: email });
    if (!user) return '';
    const { id, primaryEmail, primaryPhoneNumber } = user;
    const now = Date.now();
    const changePasswordToken: string = jwt.sign({ primaryEmail: email, primaryPhoneNumber, now });
    await dsXUser.updateOne({ id }, { changePasswordToken });
    const subject: string = 'X BANK - CHANGE PASSWORD';
    const url: string = `${URL_BASE}/change-password?token=${changePasswordToken}`;
    const content: string = `CHANGE PASSWORD\n\n${url}`;
    await this.sendMail([primaryEmail], subject, content);
    return 'OK';
  }

  private async sendMail(emails: Array<string>, subject: string, text: string): Promise<void> {
    const sendMailResponse: any = await mailer.sendMail(emails, subject, text);
    logger.info(`sendMail ${sendMailResponse}`);
  }

  public async changePassword(token: string, password: string): Promise<string> {
    const { primaryEmail = '', primaryPhoneNumber = '' } = jwt.verify(token);
    const filterQuery = { primaryEmail, primaryPhoneNumber, changePasswordToken: token };
    const user: IXUser = await dsXUser.findOne(filterQuery);
    const { id } = user;
    const hashPassword: string = await bcrypt.hash(password);
    await dsXUser.updateOne({ id }, { password: hashPassword, changePasswordToken: '' });
    return 'OK';
  }

  public async getMe(username: string): Promise<IXUser> {
    const user: IXUser = await dsXUser.findOne({ username }, { selectedFields: ['name', 'email'] });
    return user;
  }

  public getGoogleAuthURL(): string {
    return googleAuth.getGoogleAuthURL();
  }

  public async signInWithGoogle(code: string) {
    const googleUser = await googleAuth.getGoogleUserInfo(code);
    logger.info(`signInWithGoogle() googleUser ${JSON.stringify(googleUser)}`);
    const { email } = googleUser;
    const user = await dsXUser.findOne({ primaryEmail: email }, { excludedFields: ['_id'] });
    logger.info(`signInWithGoogle() user ${JSON.stringify(user)}`);
    if (!user || _.isEmpty(user)) {
      return { token: '', errorMessage: 'Invalid Email Address' };
    }
    const { primaryEmail = '' } = user;
    const token: string = jwt.sign({ primaryEmail });
    return { token, errorMessage: '' };
  }

  public getFacebookAuthURL(): string {
    return facebookAuth.getFacebookAuthURL();
  }

  public async signInWithFacebook(code: string) {
    const facebookUser = await facebookAuth.getFacebookUserData(code);
    logger.info(`signInWithFacebook() facebookUser ${JSON.stringify(facebookUser)}`);
    const { email } = facebookUser;
    const user = await dsXUser.findOne({ primaryEmail: email }, { excludedFields: ['_id'] });
    logger.info(`signInWithFacebook() user ${JSON.stringify(user)}`);
    if (!user || _.isEmpty(user)) {
      return { token: '', errorMessage: 'Invalid Email Address' };
    }
    const { primaryEmail = '' } = user;
    const token: string = jwt.sign({ primaryEmail });
    return { token, errorMessage: '' };
  }
}
