'use strict';

import fetch from 'node-fetch';

import { IYouTubeVideo, IYouTubeVideoCategory } from '../models/interfaces';

type Units = 'standard' | 'metric' | 'imperial';

export default class YouTube {
  private key: string;
  private regionCode: string = 'VN';
  private base: string = 'https://www.googleapis.com/youtube/v3';

  constructor(key: string) {
    this.key = key;
  }

  getMostPopularVideos(videoCategoryId: number = 0): Promise<Array<IYouTubeVideo>> {
    const { key, regionCode, base } = this;
    const url = `${base}/videos?part=snippet&videoCategoryId=${videoCategoryId}&chart=mostPopular&maxResults=50&regionCode=${regionCode}&key=${key}`;
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          const { items = [] } = res;
          const videos = items.map(item => {
            const { id, snippet = {} } = item;
            const {
              channelId = '',
              title = '',
              publishedAt = '',
              description = '',
              channelTitle = '',
              tags = [],
              categoryId = ''
            } = snippet;
            const url: string = `https://www.youtube.com/watch?v=${id}`;
            return {
              id,
              channelId,
              title,
              publishedAt,
              description,
              channelTitle,
              tags,
              categoryId,
              url
            };
          });
          resolve(videos);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }

  async getVideoCategories(): Promise<Array<IYouTubeVideoCategory>> {
    const { key, regionCode, base } = this;
    const url = `${base}/videoCategories?regionCode=${regionCode}&key=${key}`;
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          const { items = [] } = res;
          const videoCategories = items.map(item => {
            const { id, snippet = {} } = item;
            const { title, assignable, channelId } = snippet;
            return { id, title, assignable, channelId };
          });
          resolve(videoCategories);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
