'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class VTV extends Utils {
  private source: string = 'VTV';
  private sourceURL: string = 'https://vtv.vn';
  private rss: Record<string, any> = {
    business: 'https://vtv.vn/kinh-te.rss',
    entertainment: 'https://vtv.vn/van-hoa-giai-tri.rss',
    general: 'https://vtv.vn/trong-nuoc.rss',
    weather: 'https://vtv.vn/du-bao-thoi-tiet.rss',
    travel: 'http://vtv.vn/doi-song/du-lich.rss',
    sports: 'https://vtv.vn/the-thao.rss',
    technology: 'https://vtv.vn/cong-nghe.rss',
    gender: 'http://vtv.vn/doi-song/gioi-tinh.rss',
    beauty: 'http://vtv.vn/doi-song/lam-dep.rss',
    health: 'http://vtv.vn/doi-song/suc-khoe.rss',
    education: 'http://vtv.vn/giao-duc.rss',
    football: 'http://vtv.vn/the-thao/bong-da.rss',
    tennis: 'http://vtv.vn/the-thao/tennis.rss',
    film: 'http://vtv.vn/van-hoa-giai-tri/dien-anh.rss',
    music: 'http://vtv.vn/van-hoa-giai-tri/am-nhac.rss',
    politics: 'http://vtv.vn/trong-nuoc/chinh-tri.rss',
    society: 'http://vtv.vn/trong-nuoc/xa-hoi.rss',
    law: 'http://vtv.vn/trong-nuoc/phap-luat.rss'
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
