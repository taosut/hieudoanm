'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const user = _.get(res, 'locals.user', {});
  const notificationId: string = _.get(req, 'body.id', '');
  const updatedContact: Record<string, any> = await xService.confirmContactRequest(
    user,
    notificationId
  );
  return res.json(updatedContact);
};
