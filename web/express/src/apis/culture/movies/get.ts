'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { cultureService } from '../../../services';

export default async (req: Request, res: Response) => {
  const type: string = _.get(req, 'query.type', '');
  const movies: Array<any> = await cultureService.getMovies(type);
  return res.json(movies);
};
