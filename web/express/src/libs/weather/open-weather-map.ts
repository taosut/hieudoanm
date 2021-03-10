'use strict';

import fetch from 'node-fetch';

type Units = 'standard' | 'metric' | 'imperial';

export default class OpenWeatherMap {
  private appId: string;
  private base: string = 'http://api.openweathermap.org/data/2.5';

  constructor(appId: string) {
    this.appId = appId;
  }

  getCurrentWeather(q: string): Promise<Record<string, any>> {
    const { appId, base } = this;
    const url = `${base}/weather?units=metric&q=${q}&appid=${appId}`;
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.error(error);
          resolve({ message: error.stack });
        });
    });
  }
}
