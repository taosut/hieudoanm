'use strict';

import _ from 'lodash';

import { google, news } from '../libs';
export default class NewsService {
  public async getArticles(source: string, category: string, max: number = 0): Promise<Array<any>> {
    if (source) {
      const articles: Array<Record<string, any>> = await news.getArticles(source, category);
      const results: Array<Record<string, any>> = max ? articles.slice(0, max) : articles;
      return results;
    }
    const sources = news.getSources();
    return new Promise(resolve => {
      Promise.all(
        sources.map(async (source: string) => {
          return await news.getArticles(source, category);
        })
      )
        .then((res: Array<Record<string, any>>) => {
          const articles: Array<Record<string, any>> = _.flattenDeep(res).sort(
            (a, b) => b.timestamp - a.timestamp
          );
          const results: Array<Record<string, any>> = max ? articles.slice(0, max) : articles;
          resolve(results);
        })
        .catch(error => {
          console.error('getArticles() error', error);
          resolve([]);
        });
    });
  }

  public getCategories(source: string): Array<string> {
    if (source) return news.getCategories(source);
    const sources = news.getSources();
    let categories = [];
    for (const source of sources) {
      categories = categories.concat(news.getCategories(source));
    }
    return _.uniq(_.flattenDeep(categories)).sort();
  }

  public getSources(): Array<string> {
    return news.getSources();
  }

  public async getGoogleTrends(country: string): Promise<Array<string>> {
    return await google.getTrends(country);
  }
}
