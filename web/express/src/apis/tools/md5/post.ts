'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import md5 from 'md5';

export default async (req: Request, res: Response) => {
  const message: string = _.get(req, 'body.message', '');
  const hash: string = md5(message);
  return res.status(200).json({ hash });
};
