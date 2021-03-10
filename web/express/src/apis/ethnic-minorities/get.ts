'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { ethnicMinoritiesService } from '../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const type_en = _.get(req, 'query.type_en', '');
  const ethnicMinorities = await ethnicMinoritiesService.getEthnicMinorities(type_en);
  return res.json(ethnicMinorities);
};
