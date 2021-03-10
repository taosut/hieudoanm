'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../../services';

export default async (req: Request, res: Response) => {
  const changePasswordToken: string = _.get(req, 'body.token', '');
  const password: string = _.get(req, 'body.password', '');
  const status: string = await xService.changePassword(changePasswordToken, password);
  return res.json({ status });
};
