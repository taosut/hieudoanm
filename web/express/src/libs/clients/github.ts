'use strict';

import _ from 'lodash';
import yaml from 'js-yaml';
import fetch from 'node-fetch';

export default class GitHubClient {
  private token: string = '';
  constructor(token: string) {
    this.token = token;
  }

  public async getStatus(): Promise<string> {
    const url: string = 'https://www.githubstatus.com/api/v2/status.json';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          const indicator: string = _.get(res, 'status.indicator', '');
          const status: string = indicator === 'none' ? 'OK' : 'ERROR';
          resolve(status);
        })
        .catch(error => {
          console.error(error);
          resolve('ERROR');
        });
    });
  }

  public async getRepository(repo: string): Promise<Record<string, any>> {
    const { token } = this;
    const url: string = `https://api.github.com/repos/${repo}`;
    return new Promise(resolve => {
      fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`
        }
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          resolve(res);
        })
        .catch(error => {
          console.error(error);
          resolve({});
        });
    });
  }

  public async getLanguages() {
    const url: string =
      'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';
    const yml = (await fetch(url).then(res => res.text())) || {};
    const doc: Record<string, any> = yaml.load(yml);
    const languages = Object.keys(doc)
      .map(language => {
        const obj = doc[language];
        return Object.assign(obj, { language });
      })
      .filter(language => language.type === 'programming' && language.color)
      .map(item => {
        const { language = '', color = '', extensions = [] } = item;
        return { language, color, extensions: extensions.join(',') };
      })
      .sort((a, b) => (a.language > b.language ? 1 : -1));
    return languages;
  }
}
