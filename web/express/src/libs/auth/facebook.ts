'use strict';

import axios from 'axios';
import queryString from 'query-string';

export default class FacebookAuth {
  private clientId: string = '';
  private clientSecret: string = '';
  private redirect: string = '';

  constructor(clientId: string, clientSecret: string, redirect: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirect = redirect;
  }

  public getFacebookAuthURL(): string {
    const { clientId, redirect } = this;
    const stringifiedParams = queryString.stringify({
      client_id: clientId,
      redirect_uri: redirect,
      scope: ['email'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup'
    });

    const facebookAuthURL: string = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    return facebookAuthURL;
  }

  public async getAccessTokenFromCode(code): Promise<string> {
    const { clientId, clientSecret, redirect } = this;
    return new Promise(resolve => {
      axios({
        url: 'https://graph.facebook.com/v4.0/oauth/access_token',
        method: 'get',
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirect,
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

  public async getFacebookUserData(code: string) {
    const accessToken: string = await this.getAccessTokenFromCode(code);
    const { data = {} } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        access_token: accessToken
      }
    });
    return data;
  }
}
