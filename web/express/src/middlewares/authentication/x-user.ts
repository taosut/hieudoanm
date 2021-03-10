'use strict';

import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

import { dsXUser } from '../../data';
import { jwt, logger } from '../../libs';

export default async (req: Request, res: Response, next: NextFunction) => {
  const xToken: string = _.get(req, 'headers.x-token', '');

  if (!xToken) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  const { primaryEmail = '' } = jwt.verify(xToken);
  if (!primaryEmail) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  const excludedFields: Array<string> = ['_id', '__v', 'password'];
  const user = await dsXUser.findOne({ primaryEmail }, { excludedFields });
  logger.info(`authentication x-user ${user}`);
  if (!user) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  res.locals.user = user;

  next();
};
