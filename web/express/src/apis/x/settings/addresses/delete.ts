'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const addressId: string = _.get(req, 'query.id', {});
  const updatedUser = await xService.deleteAddress(addressId, user);
  return res.json(updatedUser);
};
