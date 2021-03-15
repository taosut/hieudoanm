import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { AppState } from "../app.state";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class ApisService {
  private base: string = environment.baseAPI;
  private token: string = "";

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.store
      .select((state) => state.authentication.token)
      .subscribe((token: string) => {
        this.token = token;
      });
  }

  public async signIn(username: string, password: string): Promise<any> {
    const { base } = this;
    const body = { username, password };
    const url: string = `${base}/x/auth/sign-in`;
    return await this.httpService.post(url, body);
  }

  public async signInWithGoogle(code: string): Promise<any> {
    const { base } = this;
    const body = { code };
    const url: string = `${base}/x/auth/google`;
    return await this.httpService.post(url, body);
  }

  public async signInWithFacebook(code: string): Promise<any> {
    const { base } = this;
    const body = { code };
    const url: string = `${base}/x/auth/facebook`;
    return await this.httpService.post(url, body);
  }

  public async signUp(
    email: string,
    phoneNumber: string,
    password: string
  ): Promise<any> {
    const { base } = this;
    const body = { email, phoneNumber, password };
    const url: string = `${base}/x/auth/sign-up`;
    return await this.httpService.post(url, body);
  }

  public async getProfile(): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/profile`;
    return await this.httpService.get(url, token);
  }

  public async updateProfile(body: any = {}): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/profile`;
    return await this.httpService.patch(url, body, token);
  }

  public async deleteProfile(): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/profile`;
    return await this.httpService.delete(url, token);
  }

  public async addEmail(email: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/emails`;
    return await this.httpService.post(url, { email }, token);
  }

  public async deleteEmail(email: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/emails?email=${email}`;
    return await this.httpService.delete(url, token);
  }

  public async updatePrimaryEmail(email: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/emails/primary`;
    return await this.httpService.patch(url, { email }, token);
  }

  public async addPhoneNumber(phoneNumber: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/phone-numbers`;
    return await this.httpService.post(url, { phoneNumber }, token);
  }

  public async deletePhoneNumber(phoneNumber: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/phone-numbers`;
    return await this.httpService.post(url, { phoneNumber }, token);
  }

  public async updatePrimaryPhoneNumber(phoneNumber: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/phone-numbers/primary`;
    return await this.httpService.patch(url, { phoneNumber }, token);
  }

  public async addAddress(address: any): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/addresses`;
    return await this.httpService.post(url, address, token);
  }

  public async deleteAddress(addressId: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/addresses?id=${addressId}`;
    return await this.httpService.delete(url, token);
  }

  public async getAllBanks(): Promise<any> {
    const { base } = this;
    const url: string = `${base}/banks`;
    return await this.httpService.get(url);
  }

  public async addBank(bank: any): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/banks`;
    return await this.httpService.post(url, bank, token);
  }

  public async deleteBank(bankCode: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/settings/banks?code=${bankCode}`;
    return await this.httpService.delete(url, token);
  }

  public async getBalance(): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/balance`;
    return await this.httpService.get(url, token);
  }

  public async topUp(amount: number): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/top-up`;
    return await this.httpService.post(url, { amount }, token);
  }

  public async search(query: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/search`;
    return await this.httpService.post(url, { query }, token);
  }

  public async pay(
    email: string,
    amount: number,
    description: string
  ): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/pay`;
    return await this.httpService.post(
      url,
      { email, amount, description },
      token
    );
  }

  public async sendRequest(
    email: string,
    amount: number,
    description: string
  ): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/request/send`;
    return await this.httpService.post(
      url,
      { email, amount, description },
      token
    );
  }

  public async confirmTransferRequest(transactionId: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/request/confirm`;
    return await this.httpService.post(url, { id: transactionId }, token);
  }

  public async getTransactions(): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/transactions`;
    return await this.httpService.get(url, token);
  }

  public async getContacts(): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/contacts`;
    return await this.httpService.get(url, token);
  }

  public async addContact(email: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/contacts`;
    return await this.httpService.post(url, { email }, token);
  }

  public async getNotifications(): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/notifications`;
    return await this.httpService.get(url, token);
  }

  public async confirmContactRequest(contactId: string): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/contacts/confirm`;
    return await this.httpService.post(url, { id: contactId }, token);
  }

  public async getMe(username: string = ""): Promise<any> {
    const { base, token } = this;
    const url: string = `${base}/x/apps/me?username=${username}`;
    return await this.httpService.get(url, token);
  }

  public async forgetPassword(email: string): Promise<any> {
    const { base } = this;
    const url: string = `${base}/x/auth/password/forget`;
    return await this.httpService.post(url, { email });
  }

  public async changePassword(token: string, password: string): Promise<any> {
    const { base } = this;
    const url: string = `${base}/x/auth/password/change`;
    return await this.httpService.post(url, { token, password });
  }

  public async getGoogleAuthURL(): Promise<any> {
    const { base } = this;
    const url: string = `${base}/x/auth/google`;
    return await this.httpService.get(url);
  }

  public async getFacebookAuthURL(): Promise<any> {
    const { base } = this;
    const url: string = `${base}/x/auth/facebook`;
    return await this.httpService.get(url);
  }

  public async getForexRates(): Promise<any> {
    const { base } = this;
    const url: string = `${base}/banks/forex/rates`;
    return await this.httpService.get(url);
  }

  public async getStockCompanies(): Promise<any> {
    const { base } = this;
    const url: string = `${base}/finance/companies`;
    return await this.httpService.get(url);
  }

  public async getStockHistory(
    symbol: string,
    from: number,
    to: number
  ): Promise<any> {
    const { base } = this;
    const url: string = `${base}/finance/history?symbol=${symbol}&from=${from}&to=${to}`;
    return await this.httpService.get(url);
  }

  public uploadBankImage(file: File): Promise<any> {
    const { base } = this;
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.httpService.post(`${base}/banks/upload`, formData);
  }
}
