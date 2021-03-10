'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { youTubeService } from '../../../services';

export default async (req: Request, res: Response) => {
  const categories = await youTubeService.getVideoCategories();
  return res.json(categories);
};
