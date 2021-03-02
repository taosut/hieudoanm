'use strict';

import Base from './base';

import { INewsArticle } from '../constants';

export default class News extends Base {
  public async getGoogleTrends(): Promise<Array<string>> {
    const endpoint: string = `news/trends`;
    const { trends = [] } = (await this.get(endpoint)) || {};
    return trends;
  }

  public async getArticles(
    source: string = '',
    category: string = '',
    max: number = 0
  ): Promise<Array<INewsArticle>> {
    const endpoint: string = `news/articles?source=${source}&category=${category}&max=${max}`;
    return await this.get(endpoint);
  }

  public async getSources(): Promise<Array<string>> {
    const endpoint: string = `news/sources`;
    const { sources = [] } = (await this.get(endpoint)) || {};
    return sources;
  }

  public async getCategories(source: string): Promise<Array<string>> {
    const endpoint: string = `news/categories?source=${source}`;
    const { categories = [] } = (await this.get(endpoint)) || {};
    return categories;
  }
}
