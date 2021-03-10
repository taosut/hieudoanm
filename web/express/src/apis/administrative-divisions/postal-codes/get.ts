'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { administrativeDivisionsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const province_id = _.get(req, 'query.province_id', '');
  const postalCodes = await administrativeDivisionsService.getPostalCodes(province_id);
  return res.json(postalCodes);
};
