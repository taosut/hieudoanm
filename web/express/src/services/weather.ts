'use strict';

import _ from 'lodash';

import { cities, levels } from '../constants/air-visual';
import { utils, airVisual, openWeatherMap, logger, redisClient } from '../libs';

export default class WeatherService {
  public async getCurrentWeather(city: string): Promise<Record<string, any>> {
    const weather: Record<string, any> = await openWeatherMap.getCurrentWeather(city);
    return weather;
  }

  public getAirVisualCities(): Array<any> {
    return cities;
  }

  public async getAirVisual(query: string) {
    query = query.toLowerCase();
    const key: string = `air-visual-${query.split(' ').join('-')}`;
    await redisClient.del(key);
    const cache: string = await redisClient.get(key);
    if (cache) {
      logger.info(`Get Air Visual ${query} from Cache ${cache}`);
      const json = utils.parseJSON(cache, {});
      if (!_.isEmpty(json)) {
        return json;
      }
    }
    const { city = 'Hanoi', state = 'Hanoi', country = 'Vietnam' } =
      cities.find(item => item.city.toLowerCase() === query) || {};
    let result = airVisual.getAirVisual(city, state, country);
    await redisClient.setex(key, JSON.stringify(result), 60 * 60);
    return result;
  }

  public getAirVisualLevel(aqius: number) {
    const level: Record<string, any> =
      levels.find(lvl => {
        const { min, max } = lvl;
        return min <= aqius && aqius <= max;
      }) || {};
    const { icon = '', colorCode = '', description = '' } = level;
    return { icon, colorCode, description };
  }
}
