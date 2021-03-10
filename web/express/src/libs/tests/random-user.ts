'use strict';

import fetch from 'node-fetch';

interface IOptions {
  password?: string;
  results?: number;
  gender?: '' | 'male' | 'female';
  nat?:
    | ''
    | 'AU'
    | 'BR'
    | 'CA'
    | 'CH'
    | 'DE'
    | 'DK'
    | 'ES'
    | 'FI'
    | 'FR'
    | 'GB'
    | 'IE'
    | 'IR'
    | 'NO'
    | 'NL'
    | 'NZ'
    | 'TR'
    | 'US';
}

export default class RandomUser {
  public async generate(options: IOptions = {}): Promise<any> {
    const { results = 1, gender = '', nat = '', password = '' } = options;
    const url: string = `https://randomuser.me/api?results=${results}&gender=${gender}&nat=${nat}`;
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          const { results = [] } = res;
          resolve(results);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
