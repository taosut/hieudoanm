'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { informationService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const prefix: string = _.get(req, 'query.prefix', '');
  const prefixes = await informationService.getPrefixes(prefix);
  return res.json(prefixes);
};
