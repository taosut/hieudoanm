'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { newsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response> => {
  const category: string = _.get(req, 'query.category', '').toString() || '';
  const source: string = _.get(req, 'query.source', '').toString() || '';
  const max: number = parseInt(_.get(req, 'query.max', '0'), 10) || 0;
  const articles = await newsService.getArticles(source, category, max);
  return res.json(articles);
};
