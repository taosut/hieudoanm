'use strict';

import fetch from 'node-fetch';

export default class Google {
  public async getTrends(country: string = 'vietnam'): Promise<Array<string>> {
    const url: string = 'https://trends.google.com/trends/hottrends/visualize/internal/data';
    return new Promise(resolve => {
      fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          const countries: Array<string> = Object.keys(res).sort();
          if (!countries.includes(country)) {
            let allTerms = [];
            for (const country of countries) {
              const termsByCountry = res[country] || [];
              allTerms = allTerms.concat(termsByCountry);
            }
            allTerms = allTerms.filter(
              (value: string, index: number, array: Array<string>) => array.indexOf(value) === index
            );
            allTerms.sort();
            resolve(allTerms);
          }
          const terms = res[country] || [];
          terms.sort();
          resolve(terms);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
