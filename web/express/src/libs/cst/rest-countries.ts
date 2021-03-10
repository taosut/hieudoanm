'use strict';

import _ from 'lodash';
import fetch from 'node-fetch';

export default class RESTCountries {
  public async getCountries(): Promise<Array<any>> {
    const url: string = 'https://restcountries.eu/rest/v2/all';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then((res: Array<any>) => {
          resolve(res);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve([]);
        });
    });
  }

  public async getLanguages(): Promise<Array<string>> {
    const countries: Array<any> = await this.getCountries();
    const languages = _.uniq(
      _.flattenDeep(
        countries.map(country => {
          const { languages } = country;
          return languages.map(language => language.name);
        })
      )
    ).sort();
    return languages;
  }

  public async getCurrencies(): Promise<Array<string>> {
    const countries: Array<any> = await this.getCountries();
    const currencies = _.flattenDeep(countries.map(country => country.currencies));
    const codes = _.uniq(currencies.map(currency => currency.code))
      .filter(code => code)
      .sort();
    return codes.map(code => currencies.find(currency => currency.code === code));
  }
}
