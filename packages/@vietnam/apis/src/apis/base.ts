'use strict';

import fetch from 'node-fetch';

import { baseURL } from '../constants';

export default class Base {
  public async get(endpoint: string): Promise<any> {
    const url = `${baseURL}/${endpoint}`;
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then((list: Array<any> = []) => {
          resolve(list);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }

  public async post(endpoint: string, body): Promise<any> {
    const url = `${baseURL}/${endpoint}`;
    return new Promise(resolve => {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then((res: any = {}) => {
          resolve(res);
        })
        .catch(error => {
          console.error(error);
          resolve({});
        });
    });
  }
}
