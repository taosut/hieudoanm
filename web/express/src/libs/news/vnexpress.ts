'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class VNExpress extends Utils {
  private source: string = 'VNExpress';
  private sourceURL: string = 'https://vnexpress.net';
  private rss: Record<string, any> = {
    latest: 'https://vnexpress.net/rss/tin-moi-nhat.rss',
    world: 'https://vnexpress.net/rss/the-gioi.rss',
    general: 'https://vnexpress.net/rss/thoi-su.rss',
    business: 'https://vnexpress.net/rss/kinh-doanh.rss',
    startup: 'https://vnexpress.net/rss/startup.rss',
    entertainment: 'https://vnexpress.net/rss/giai-tri.rss',
    sports: 'https://vnexpress.net/rss/the-thao.rss',
    law: 'https://vnexpress.net/rss/phap-luat.rss',
    education: 'https://vnexpress.net/rss/giao-duc.rss',
    highlight: 'https://vnexpress.net/rss/tin-noi-bat.rss',
    health: 'https://vnexpress.net/rss/suc-khoe.rss',
    society: 'https://vnexpress.net/rss/gia-dinh.rss',
    travel: 'https://vnexpress.net/rss/du-lich.rss',
    science: 'https://vnexpress.net/rss/khoa-hoc.rss',
    technology: 'https://vnexpress.net/rss/so-hoa.rss',
    vehicle: 'https://vnexpress.net/rss/oto-xe-may.rss',
    opinions: 'https://vnexpress.net/rss/y-kien.rss',
    talks: 'https://vnexpress.net/rss/tam-su.rss',
    humor: 'https://vnexpress.net/rss/cuoi.rss',
    popular: 'https://vnexpress.net/rss/tin-xem-nhieu.rss'
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
