'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const code: string = _.get(req, 'body.code', '');
  const result = await xService.signInWithFacebook(code);
  return res.json(result);
};
