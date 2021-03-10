'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class Soha extends Utils {
  private source: string = 'Soha';
  private sourceURL: string = 'https://soha.vn';
  private rss: Record<string, any> = {
    business: 'https://soha.vn/kinh-doanh.rss',
    entertainment: 'https://soha.vn/giai-tri.rss',
    general: 'https://soha.vn/thoi-su.rss',
    health: 'https://soha.vn/song-khoe.rss',
    infographic: 'https://soha.vn/infographic.rss',
    sports: 'https://soha.vn/the-thao.rss',
    technology: 'https://soha.vn/cong-nghe.rss',
    society: 'https://soha.vn/doi-song.rss',
    law: 'https://soha.vn/phap-luat.rss',
    world: 'https://soha.vn/quoc-te.rss',
    military: 'https://soha.vn/quan-su.rss',
    discovery: 'https://soha.vn/kham-pha.rss'
  };

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
