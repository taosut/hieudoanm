'use strict';

import fetch from 'node-fetch';

export default class CV {
  private api_key: string;
  private base: string;

  constructor(api_key: string, base: string) {
    this.api_key = api_key;
    this.base = `${base}/vision`;
  }

  private async apiRequest(endpoint: string, file: any): Promise<any> {
    const self = this;
    const { api_key = '', base = '' } = self;

    const formData = new FormData();
    formData.append('image', file);

    const url = `${base}/${endpoint}`;
    const headers = { api_key, 'Content-Type': 'multipart/form-data' };
    let init: RequestInit = { method: 'POST', headers, body: formData };

    return new Promise(resolve => {
      fetch(url, init)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          resolve(error);
        });
    });
  }

  public async drivingLicenceRecognition(image: any) {
    return await this.apiRequest('dlr/vnm', image);
  }

  public async idCardRecognition(image: any) {
    return await this.apiRequest('idr/vnm', image);
  }

  public async passportRecognition(image: any) {
    return await this.apiRequest('passport/vnm', image);
  }
}
