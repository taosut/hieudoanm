'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { licensePlatesService } from '../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const license: string = _.get(req, 'query.license', '');
  const licensePlates = await licensePlatesService.getLicensePlates(license);
  return res.json(licensePlates);
};
