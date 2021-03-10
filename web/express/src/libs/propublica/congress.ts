'use strict';

import fetch from 'node-fetch';

type Chamber = 'house' | 'senate';

export default class Congress {
  private apiKey: string = '';
  private base: string = 'https://api.propublica.org/congress/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async apiRequest(endpoint: string): Promise<any> {
    const { apiKey, base } = this;
    const url: string = `${base}/${endpoint}`;
    const headers = { 'X-API-Key': apiKey, 'Content-Type': 'application/json;charset=UTF-8' };
    const options = { headers };
    return new Promise(resolve => {
      fetch(url, options)
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

  public async getMembers(congress: number, chamber: Chamber): Promise<Array<Record<string, any>>> {
    const res = await this.apiRequest(`${congress}/${chamber}/members.json`);
    const { results = [{}] } = res;
    const [result = { members: [] }] = results;
    const { members } = result;
    return members;
  }

  public async getCommittees(
    congress: number,
    chamber: Chamber
  ): Promise<Array<Record<string, any>>> {
    const res = await this.apiRequest(`${congress}/${chamber}/committees.json`);
    const { results = [{}] } = res;
    const [result = { committees: [] }] = results;
    const { committees } = result;
    return committees;
  }
}
