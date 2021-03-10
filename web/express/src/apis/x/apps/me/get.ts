'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const username: string = _.get(req, 'query.username', '');
  const me = !username ? _.pick(user, ['primaryEmail', 'name']) : await xService.getMe(username);
  return res.json(me);
};
