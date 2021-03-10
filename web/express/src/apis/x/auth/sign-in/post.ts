'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const username: string = _.get(req, 'body.username', '');
  const password: string = _.get(req, 'body.password', '');
  const result = await xService.signIn(username, password);
  return res.json(result);
};
