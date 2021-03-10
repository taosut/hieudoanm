'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Utils from '../utils/utils';

export default class TuoiTre extends Utils {
  private source: string = 'Tuổi Trẻ';
  private sourceURL: string = 'https://tuoitre.vn';
  private rss: Record<string, any> = {
    business: 'https://tuoitre.vn/rss/kinh-doanh.rss',
    entertainment: 'https://tuoitre.vn/rss/giai-tri.rss',
    general: 'https://tuoitre.vn/rss/thoi-su.rss',
    health: 'https://tuoitre.vn/rss/suc-khoe.rss',
    science: 'https://tuoitre.vn/rss/khoa-hoc.rss',
    sports: 'https://tuoitre.vn/rss/the-thao.rss',
    technology: 'https://tuoitre.vn/rss/nhip-song-so.rss',
    world: 'https://tuoitre.vn/rss/the-gioi.rss',
    vehicle: 'https://tuoitre.vn/rss/xe.rss',
    culture: 'https://tuoitre.vn/rss/van-hoa.rss',
    law: 'https://tuoitre.vn/rss/phap-luat.rss',
    education: 'https://tuoitre.vn/rss/giao-duc.rss',
    travel: 'https://tuoitre.vn/rss/du-lich.rss'
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
