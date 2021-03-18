import fetch from 'node-fetch';

export default class API {
  private async fetch(endpoint: string): Promise<any> {
    const url: string = `https://vietnamdb.herokuapp.com/api/${endpoint}`;
    const data: any = await fetch(url).then((res: any) => res.json());
    return data;
  }

  public getLicensePlates(license: string = '') {
    const licensePlates = this.fetch(`license-plates?license=${license}`);
    return licensePlates;
  }

  public getVisas() {
    const visas = this.fetch('visas');
    return visas;
  }
}
