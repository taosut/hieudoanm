'use strict';

import _ from 'lodash';

import { proPublica, utils, logger, redisClient } from '../libs';

export default class USAService {
  public async getCongressMembers(
    chamber: any = 'house',
    congress: number = 117
  ): Promise<Array<Record<string, any>>> {
    const key: string = `usa-congress-${congress}-${chamber}`;
    const cache: string = await redisClient.get(key);
    if (cache) {
      logger.info(`Get USA Congress ${congress} ${chamber} from Cache`);
      const json = utils.parseJSON(cache, []);
      if (!_.isEmpty(json)) {
        return json;
      }
    }
    const members = await proPublica.congress.getMembers(congress, chamber);
    await redisClient.setex(key, JSON.stringify(members), 60 * 60 * 24);
    return members;
  }

  public async getCongressCommittees(
    chamber: any = 'house',
    congress: number = 117
  ): Promise<Array<Record<string, any>>> {
    const key: string = `usa-congress-${congress}-${chamber}-committees`;
    const cache: string = await redisClient.get(key);
    if (cache) {
      logger.info(`Get USA Congress Committees ${congress} ${chamber} from Cache`);
      const json = utils.parseJSON(cache, []);
      if (!_.isEmpty(json)) {
        return json;
      }
    }
    const committees = await proPublica.congress.getCommittees(congress, chamber);
    await redisClient.setex(key, JSON.stringify(committees), 60 * 60 * 24);
    return committees;
  }
}
