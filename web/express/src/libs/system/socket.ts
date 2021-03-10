'use strict';

import fetch from 'node-fetch';

export default class Socket {
  private base: string;

  constructor(base: string) {
    this.base = base;
  }

  public async send(message: string, channel: string = 'x-bank') {
    const { base } = this;
    const url: string = `${base}/notification?channel=${channel}`;
    return new Promise(resolve => {
      fetch(url, { method: 'POST', body: JSON.stringify({ message }) })
        .then((res: any) => {
          console.log('send res', res);
          resolve(res);
        })
        .catch(error => {
          console.error('send error', error);
          resolve(error);
        });
    });
  }
}
