'use strict';

import cheerio from 'cheerio';
import fetch from 'node-fetch';

export default class PassportIndex {
  async getVisaRequirements(): Promise<Array<any>> {
    const url: string = 'https://www.passportindex.org/passport/viet-nam/';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((body: string) => {
          const $: cheerio.Root = cheerio.load(body);
          const visas = $('table#psprt-dashboard-table tbody tr')
            .get()
            .map(row => {
              const $row = $(row);
              const country: string = $row.find('td:nth-child(1) a').text().trim() || '';
              const requirement: string =
                $row.find('td:nth-child(2)').text().trim().toUpperCase() || '';
              return { country, requirement };
            });
          resolve(visas);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
