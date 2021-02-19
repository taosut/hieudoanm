'use strict';

import { request, convertJSONtoCSV } from './libs';

export const syncYouTubeVideoCategories = async () => {
  const url: string = 'https://vietnamdb.herokuapp.com/api/youtube/video-categories';
  const categories = await request(url);
  const fields: Array<string> = ['id', 'title'];
  const path: string = `../docs/youtube/video-categories.csv`;
  await convertJSONtoCSV(categories, fields, path);
};