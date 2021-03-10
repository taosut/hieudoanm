'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class LaoDong extends Utils {
  private source: string = 'Lao Động';
  private sourceURL: string = 'https://laodong.vn';
  private rss: Record<string, any> = { general: 'https://laodong.vn/rss/home.rss' };

  public async getArticles(category: string): Promise<Array<any>> {
    const self = this;
    const { rss = {}, source = '', sourceURL = '' } = this;
    const categories = this.getCategories();
    if (!category || !categories.includes(category)) category = 'general';
    const url = rss[category];
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((xml: string) => {
          const jsonString: string = xml2json.toJson(xml);
          const data = this.parseJSON(jsonString, {});
          const { rss = {} } = data;
          const { channel = {} } = rss;
          const { item = [] } = channel;
          const articles = item.map(article => {
            const { title, link: url, description, pubDate: publishedDate } = article;
            const {
              year,
              month,
              date,
              hours,
              minutes,
              seconds,
              timestamp
            } = self.processPublishedDate(publishedDate);
            return {
              title,
              url,
              description,
              publishedDate,
              source,
              sourceURL,
              year,
              month,
              date,
              hours,
              minutes,
              seconds,
              timestamp
            };
          });
          const urls: Array<string> = articles
            .map((article: any) => article.url)
            .filter((value, index, array) => array.indexOf(value) === index);
          const uniqArticles = urls.map((url: string) => {
            const article = articles.find(art => art.url === url);
            return article;
          });
          resolve(uniqArticles);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve([]);
        });
    });
  }
  public getCategories(): Array<string> {
    const { rss = {} } = this;
    return Object.keys(rss).sort();
  }
}
