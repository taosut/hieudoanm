import fetch from 'node-fetch';

export default class API {
  private async fetch(endpoint: string): Promise<any> {
    const url: string = `https://vietnamdb.herokuapp.com/api/${endpoint}`;
    const data: any = await fetch(url).then((res: any) => res.json());
    return data;
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
}
