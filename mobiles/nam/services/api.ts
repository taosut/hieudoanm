import fetch from 'node-fetch';

export default class API {
  private async fetch(
    endpoint: string,
    method: string = 'GET',
    body: Record<string, any> = {},
  ): Promise<any> {
    const url: string = `https://vietnamdb.herokuapp.com/api/${endpoint}`;
    const bodyData: string = JSON.stringify(body);
    const headers = { 'Content-Type': 'application/json' };
    const options =
      method.toUpperCase() === 'GET' ? { method, headers } : { method, headers, body: bodyData };
    return new Promise(resolve => {
      fetch(url, options)
        .then((res: any) => res.json())
        .then(res => resolve(res))
        .catch(error => {
          console.error(error);
          resolve({});
        });
    });
  }

  public async getLicensePlates(license: string = ''): Promise<Array<Record<string, any>>> {
    const licensePlates = await this.fetch(`license-plates?license=${license}`);
    return licensePlates;
  }

  public async getVisas(): Promise<Array<Record<string, any>>> {
    const visas = await this.fetch('visas');
    return visas;
  }

  public async getVLeagueTable(): Promise<Array<Record<string, any>>> {
    const table = await this.fetch('culture/sports/vleague/table');
    return table;
  }

  public async getWeather(city: string): Promise<Record<string, any>> {
    const weather = await this.fetch(`weather?city=${city}`);
    return weather;
  }

  public async convertSolarToLunar(
    date: number,
    month: number,
    year: number,
  ): Promise<Record<string, any>> {
    console.log('SOLAR', date, month, year);
    const lunar = await this.fetch('culture/calendar/solar2lunar', 'POST', { date, month, year });
    console.log('LUNAR', lunar);
    return lunar;
  }

  public async getGoogleTrends(): Promise<Array<string>> {
    const res = (await this.fetch('news/trends')) || {};
    const { trends = [] } = res;
    return trends;
  }

  public async getBanksForexRates(): Promise<Array<Record<string, any>>> {
    const rates = (await this.fetch('banks/forex/rates')) || [];
    return rates;
  }

  public async getStockCompanies(): Promise<Array<Record<string, any>>> {
    const companies: Array<Record<string, any>> = (await this.fetch('finance/companies')) || [];
    return companies;
  }
}
