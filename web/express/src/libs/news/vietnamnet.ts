'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class VietNamNet extends Utils {
  private source: string = 'VietNamNet';
  private sourceURL: string = 'https://vietnamnet.vn';
  private rss: Record<string, any> = {
    business: 'https://vietnamnet.vn/rss/kinh-doanh.rss',
    entertainment: 'https://vietnamnet.vn/rss/giai-tri.rss',
    general: 'https://vietnamnet.vn/rss/thoi-su.rss',
    health: 'https://vietnamnet.vn/rss/suc-khoe.rss',
    politics: 'https://vietnamnet.vn/rss/thoi-su-chinh-tri.rss',
    sports: 'https://vietnamnet.vn/rss/the-thao.rss',
    technology: 'https://vietnamnet.vn/rss/cong-nghe.rss',
    talks: 'https://vietnamnet.vn/rss/talkshow.rss',
    world: 'https://vietnamnet.vn/rss/the-gioi.rss',
    education: 'https://vietnamnet.vn/rss/giao-duc.rss',
    society: 'https://vietnamnet.vn/rss/doi-song.rss',
    law: 'https://vietnamnet.vn/rss/phap-luat.rss',
    estate: 'https://vietnamnet.vn/rss/bat-dong-san.rss',
    stories: 'https://vietnamnet.vn/rss/ban-doc.rss',
    weekly: 'https://vietnamnet.vn/rss/tuanvietnam.rss',
    vehicle: 'https://vietnamnet.vn/rss/oto-xe-may.rss',
    popular: 'https://vietnamnet.vn/rss/goc-nhin-thang.rss',
    highlight: 'https://vietnamnet.vn/rss/tin-moi-nong.rss',
    latest: 'https://vietnamnet.vn/rss/tin-moi-nhat.rss'
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
