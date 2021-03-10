'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { newsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response> => {
  const source: string = _.get(req, 'query.source', '');
  const categories: Array<string> = newsService.getCategories(source);
  const total: number = categories.length;
  return res.json({ total, categories });
};
