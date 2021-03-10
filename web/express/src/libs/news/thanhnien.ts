'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class ThanhNien extends Utils {
  private source: string = 'Thanh Niên';
  private sourceURL: string = 'https://thanhnien.vn';
  private rss: Record<string, any> = {
    business: 'https://thanhnien.vn/rss/tai-chinh-kinh-doanh.rss',
    entertainment: 'https://thanhnien.vn/rss/giai-tri.rss',
    general: 'https://thanhnien.vn/rss/thoi-su.rss',
    health: 'https://thanhnien.vn/rss/suc-khoe.rss',
    world: 'https://thanhnien.vn/rss/the-gioi.rss',
    sports: 'https://thethao.thanhnien.vn/rss/home.rss',
    technology: 'https://thanhnien.vn/rss/cong-nghe.rss',
    military: 'https://thanhnien.vn/rss/the-gioi/quan-su.rss',
    culture: 'https://thanhnien.vn/rss/van-hoa.rss',
    film: 'https://thanhnien.vn/rss/giai-tri/phim.rss',
    stock: 'https://thanhnien.vn/rss/tai-chinh-kinh-doanh/chung-khoan.rss',
    banking: 'https://thanhnien.vn/rss/tai-chinh-kinh-doanh/ngan-hang.rss',
    beauty: 'https://thanhnien.vn/rss/suc-khoe/lam-dep.rss',
    gender: 'https://thanhnien.vn/rss/suc-khoe/gioi-tinh.rss',
    vehicle: 'https://xe.thanhnien.vn/rss/home.rss'
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
