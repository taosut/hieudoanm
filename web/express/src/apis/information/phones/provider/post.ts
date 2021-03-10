'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { informationService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const number = _.get(req, 'body.number', '');
  const provider: string = await informationService.getProviderFromPhoneNumber(number);
  return res.json({ provider });
};
