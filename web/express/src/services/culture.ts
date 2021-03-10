'use strict';

import _ from 'lodash';

import { dsHistoryDynasty, dsSportsClub } from '../data';
import { cgv, redisClient, logger, liveScore, utils } from '../libs';

export default class CultureService {
  public async getMovies(type: string = 'now-showing'): Promise<Array<Record<string, any>>> {
    const _type = type === 'coming-soon' ? 'coming-soon' : 'now-showing';
    const key: string = `culture-movies-${_type}`;
    const cache: string = await redisClient.get(key);
    if (cache) {
      logger.info(`Get Movies (${_type}) from Cache`);
      const json = utils.parseJSON(cache, []);
      if (!_.isEmpty(json)) {
        return json;
      }
    }
    const movies = type === 'coming-soon' ? await cgv.getComingSoon() : await cgv.getNowShowing();
    await redisClient.setex(key, JSON.stringify(movies), 60 * 60 * 24);
    return movies;
  }

  public async getHistoryDynasties(): Promise<Array<Record<string, any>>> {
    const fields: Array<string> = [
      'temple_name',
      'birth_name',
      'birth',
      'death',
      'start_year',
      'end_year',
      'dynasty'
    ];
    const dynasties: Array<Record<string, any>> = await dsHistoryDynasty.find({}, fields);
    return dynasties;
  }

  public async getSportsClubs(sport_en: string): Promise<Array<Record<string, any>>> {
    const fields: Array<string> = ['sport', 'sport_en', 'competition', 'city', 'name'];
    const clubs: Array<Record<string, any>> = await dsSportsClub.find({ sport_en }, fields);
    return clubs;
  }

  public async getVLeague(): Promise<any> {
    return liveScore.getVLeague();
  }
}
