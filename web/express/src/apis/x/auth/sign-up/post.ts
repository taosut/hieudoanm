'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const email: string = _.get(req, 'body.email', '');
  const phoneNumber: string = _.get(req, 'body.phoneNumber', '');
  const password: string = _.get(req, 'body.password', '');
  const result = await xService.signUp(email, phoneNumber, password);
  return res.json(result);
};
