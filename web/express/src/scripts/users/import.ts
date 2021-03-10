'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import _ from 'lodash';

import { dsXUser } from '../../data';
import { bcrypt, utils, logger, mongooseClient, esClient } from '../../libs';

const esXUserIndex: string = 'x-user';

const addESDoc = async (body: any): Promise<any> => {
  const addResponse = await esClient.add(esXUserIndex, body);
  logger.info('addESDoc() addResponse ${addResponse}');
  return addResponse;
};

const main = async () => {
  await mongooseClient.connect();

  await dsXUser.delete({ test: true });
  await esClient.delete(esXUserIndex, { test: { query: true } });

  const testUsers = await utils.convertCSVtoJSON('./test-users.csv');
  for (const testUser of testUsers) {
    try {
      const { name, username, password, email, cell: phoneNumber } = testUser;
      const hashPassword: string = await bcrypt.hash(password.toString());
      const joinInAt: number = Date.now();
      const balance: number = 0;
      const id: string = utils.uuid();
      const addResponse = await addESDoc({ email, phoneNumber, username, test: true });
      const esId: string = _.get(addResponse, 'body._id', '');
      logger.info('import() esId ${esId}');
      const mongoDoc = {
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
        test: true
      };
      logger.info('import() mongoDoc ${mongoDoc}');
      const user = await dsXUser.create(mongoDoc);
      logger.info('import() user ${user}');
    } catch (error) {
      logger.error(`import() error ${error}`);
    }
  }
  process.exit(0);
};

main().catch(error => logger.error(error));
