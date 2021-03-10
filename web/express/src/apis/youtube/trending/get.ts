'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { youTubeService } from '../../../services';

export default async (req: Request, res: Response) => {
  const categoryId: number = _.get(req, 'query.categoryId', 0) || 0;
  const videos = await youTubeService.getTrending(categoryId);
  return res.json(videos);
};
