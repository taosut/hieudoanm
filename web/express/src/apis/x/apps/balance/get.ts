'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const { balance = 0, currencyCode = '' } = user;
  return res.json({ balance, currencyCode });
};
