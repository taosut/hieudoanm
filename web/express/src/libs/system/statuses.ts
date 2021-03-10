'use strict';

import _ from 'lodash';
import fetch from 'node-fetch';

export default class Statuses {
  private async getStatus(url: string): Promise<Record<string, any>> {
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

  public async getHerokuStatus(): Promise<string> {
    const url: string = 'https://status.heroku.com/api/ui/systems';
    const response: Record<string, any> = await this.getStatus(url);
    const { data = [] } = response;
    const errorFlag: boolean = data.some(item => {
      const color: string = _.get(item, 'attributes.color', '').toLowerCase();
      return color !== 'green';
    });
    return !errorFlag ? 'OK' : 'ERROR';
  }
}
