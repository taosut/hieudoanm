'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const email: string = _.get(req, 'body.email');
  const updatedUser = await xService.addEmail(email, user);
  return res.json(updatedUser);
};
