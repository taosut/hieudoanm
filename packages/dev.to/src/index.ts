'use strict';

import fetch from 'node-fetch';

export default class DevTo {
  private apiKey: string;
  private base: string = 'https://dev.to/api';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async getArticles(skip: number = 1, limit: number = 10, tags: Array<string> = []) {
    const { base } = this;
    const tagsList = tags.map(tag => tag.trim()).join(',');
    const url = `${base}/articles?page=${skip}&per_page=${limit}&tags=${tagsList}`;
    return await fetch(url).then(res => res.json());
  }

  public async getTags(skip: number = 1, limit: number = 1000) {
    const { base } = this;
    const url = `${base}/tags?page=${skip}&per_page=${limit}`;
    return await fetch(url).then(res => res.json());
  }
}
