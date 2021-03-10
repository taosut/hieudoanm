'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const { id = '' } = user;
  const updateBody = _.get(req, 'body', {});
  const updatedUser = await xService.updateProfile(id, updateBody);
  return res.json(updatedUser);
};
