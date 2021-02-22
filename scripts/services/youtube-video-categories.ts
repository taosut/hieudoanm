'use strict';

import { api } from '../constant';
import { request, convertJSONtoCSV } from '../libs';

export const syncYouTubeVideoCategories = async (): Promise<void> => {
  const url: string = `${api}/youtube/video-categories`;
  const categories = await request(url);
  if (!categories.length) return;
  const fields: Array<string> = ['id', 'title'];
  const path: string = `../docs/youtube/video-categories.csv`;
  await convertJSONtoCSV(categories, fields, path);
};
