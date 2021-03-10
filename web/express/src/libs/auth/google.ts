'use strict';

import axios from 'axios';
import queryString from 'query-string';

export default class GoogleAuth {
  private clientId: string = '';
  private clientSecret: string = '';
  private redirect: string = '';

  constructor(clientId: string, clientSecret: string, redirect: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirect = redirect;
  }

  public getGoogleAuthURL(): string {
    const { clientId, redirect } = this;
    const stringifiedParams = queryString.stringify({
      client_id: clientId,
      redirect_uri: redirect,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent'
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  }

  public async getAccessTokenFromCode(code): Promise<string> {
    const { clientId, clientSecret, redirect } = this;
    return new Promise(resolve => {
      axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'POST',
        data: {
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirect,
          grant_type: 'authorization_code',
          code
        }
      })
        .then(res => {
          const { data } = res;
          const { access_token } = data;
          resolve(access_token);
        })
        .catch(error => {
          console.error(error);
          resolve('');
        });
    });
  }

  public async getGoogleUserInfo(code: string) {
    const accessToken: string = await this.getAccessTokenFromCode(code);
    const { data = {} } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return data;
  }
}
