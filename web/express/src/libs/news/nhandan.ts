'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class NhanDan extends Utils {
  private source: string = 'Nhân Dân';
  private sourceURL: string = 'https://nhandan.com.vn';
  private rss: Record<string, any> = {
    business: 'https://en.nhandan.org.vn/rss/business.html',
    politics: 'https://en.nhandan.com.vn/rss/politics.html',
    society: 'https://en.nhandan.com.vn/rss/society.html',
    culture: 'https://en.nhandan.com.vn/rss/culture.html',
    sports: 'https://en.nhandan.org.vn/rss/sports.html',
    technology: 'https://en.nhandan.org.vn/rss/scitech.html',
    travel: 'https://en.nhandan.com.vn/rss/travel.html',
    world: 'https://en.nhandan.com.vn/rss/world.html',
    video: 'https://en.nhandan.com.vn/rss/video.html'
  };

  public async getArticles(category: string): Promise<Array<any>> {
    const self = this;
    const { rss = {}, source = '', sourceURL = '' } = this;
    const categories = this.getCategories();
    if (!category || !categories.includes(category)) category = 'politics';
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
          resolve(articles);
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
