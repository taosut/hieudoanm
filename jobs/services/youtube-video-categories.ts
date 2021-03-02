'use strict';

import { youTube } from 'vnapis';

import { convertJSONtoCSV } from '../libs';

export const syncYouTubeVideoCategories = async (): Promise<void> => {
  const categories = await youTube.getVideoCategories();
  if (!categories.length) return;
  const fields: Array<string> = ['id', 'title'];
  const path: string = `../docs/youtube/video-categories.csv`;
  await convertJSONtoCSV(categories, fields, path);
};
