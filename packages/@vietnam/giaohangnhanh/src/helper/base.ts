'use strict';

import fetch from 'node-fetch';

import { IResponse, IRequestOptions, IEndpoint } from './constants';

export default class Base {
  private token: string;
  private test: boolean;

  constructor(token: string, test: boolean) {
    this.token = token;
    this.test = test;
  }

  private convertObjectToQueryString(query: any = {}): string {
    return Object.keys(query)
      .map(key => {
        const value: string = (query[key] || '').toString();
        return `${key}=${value}`;
      })
      .join('&');
  }

  private buildURL(api: string, query: any = {}): string {
    const queryParamsString: string = this.convertObjectToQueryString(query);
    const url: string = `${api}?${queryParamsString}`;
    return encodeURI(url);
  }

  public async fetch(endpoint: IEndpoint, options: IRequestOptions = {}): Promise<IResponse> {
    const { token } = this;
    const { production, test, method } = endpoint;
    const api: string = this.test ? test : production;
    const { query = {}, body = {} } = options;
    const url = this.buildURL(api, query);
    const headers = { Token: token, 'Content-Type': 'application/json' };
    const requestInit: RequestInit = Object.keys(body).length
      ? { method, headers, body: JSON.stringify(body) }
      : { method, headers };
    return new Promise(resolve => {
      fetch(url, requestInit)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          resolve({ code: 0, message: error.stack, data: {} });
        });
    });
  }
}
