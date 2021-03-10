'use strict';

import fetch from 'node-fetch';

export default class IPAPI {
  public async getGeolocation(ip: string): Promise<any> {
    const url: string = `http://ip-api.com/json/${ip}`;
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.error(error);
          resolve({});
        });
    });
  }
}
