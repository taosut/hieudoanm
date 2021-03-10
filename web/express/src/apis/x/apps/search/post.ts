'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const query: string = _.get(req, 'body.query', '');
  const searchResponse = await xService.search(query);
  return res.json(searchResponse);
};
