'use strict';

import Base from './base';

export default class Weather extends Base {
  public async getWeather(city: string = ''): Promise<Record<string, any>> {
    return await this.get(`weather?city=${city}`);
  }

  public async getAirVisual(city: string = ''): Promise<Record<string, any>> {
    return await this.get(`weather/air-visual?city=${city}`);
  }

  public async getAirVisualCities(): Promise<Array<Record<string, any>>> {
    return await this.get(`weather/air-visual/cities`);
  }
}
