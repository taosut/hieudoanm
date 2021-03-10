'use strict';

import _ from 'lodash';

import { IYouTubeVideo, IYouTubeVideoCategory } from '../models/interfaces';
import { utils, youTube, logger, redisClient } from '../libs';

export default class YouTubeService {
  public async getTrending(categoryId: number = 0): Promise<Array<IYouTubeVideo>> {
    const key: string = `youtube-trending-${categoryId}`;
    const cache: string = await redisClient.get(key);
    if (cache) {
      logger.info(`Get YouTube Trending ${categoryId} from Cache`);
      const json = utils.parseJSON(cache, {});
      if (!_.isEmpty(json)) {
        return json;
      }
    }
    const videos: Array<IYouTubeVideo> = await youTube.getMostPopularVideos(categoryId);
    await redisClient.setex(key, JSON.stringify(videos), 60 * 60);
    return videos;
  }

  public async getVideoCategories(): Promise<Array<IYouTubeVideoCategory>> {
    const key: string = 'youtube-video-categories';
    const cache: string = await redisClient.get(key);
    if (cache) {
      logger.info(`Get YouTube Video Categories from Cache ${cache}`);
      const json = utils.parseJSON(cache, {});
      if (!_.isEmpty(json)) {
        return json;
      }
    }
    const categories: Array<IYouTubeVideoCategory> = await youTube.getVideoCategories();
    await redisClient.setex(key, JSON.stringify(categories), 60 * 60);
    return categories;
  }
}
