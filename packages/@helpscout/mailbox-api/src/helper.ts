'use strict';

import axios from 'axios';

interface AccsesTokenOptions {
  appId: string;
  appSecret: string;
}

interface RequestOptions {
  url: string;
  method: string;
  body?: any;
}

class Helper {
  public async getAccessToken(options: AccsesTokenOptions): Promise<string> {
    const { appId: client_id = '', appSecret: client_secret = '' } = options;
    const grant_type: string = 'client_credentials';
    const method: string = 'POST';
    const url: string = 'https://api.helpscout.net/v2/oauth2/token';
    const body: any = { client_id, client_secret, grant_type };
    return new Promise(resolve => {
      axios
        .post(url, body)
        .then(res => {
          const { data } = res;
          const { token_type = '', access_token = '' } = data;
          const accessToken = `${token_type} ${access_token}`.trim();
          resolve(accessToken);
        })
        .catch(error => {
          console.error('getAccessToken() error', error);
          resolve('');
        });
    });
  }

  public async request(
    accessTokenOptions: AccsesTokenOptions,
    requestOptions: RequestOptions
  ): Promise<any> {
    const { appId, appSecret } = accessTokenOptions;
    const { url, method, body = {} } = requestOptions;
    const accessToken: string = await helper.getAccessToken({ appId, appSecret });
    if (!accessToken) return { message: 'Invalid authentication' };
    const headers: any = { Authorization: accessToken };
    const fetchOptions: any = method.toUpperCase() === 'GET' ? { headers } : { headers, body };
    return new Promise(resolve => {
      axios[method.toLowerCase()](url, fetchOptions)
        .then(res => {
          const { data } = res;
          resolve(data);
        })
        .catch(error => {
          resolve(error);
        });
    });
  }

  public queryStringify(queryParameters: any, validParameters: Array<string> = []): string {
    return Object.keys(queryParameters)
      .filter((key: string) => {
        const valid: boolean = validParameters.length ? validParameters.includes(key) : true;
        const value: string = (queryParameters[key] || '').trim();
        return valid && value;
      })
      .map((key: string) => `${key}=${queryParameters[key]}`)
      .join('&');
  }
}

const helper: Helper = new Helper();

export default helper;
