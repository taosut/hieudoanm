'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { qrCodesService } from '../../services';

export default async (req: Request, res: Response) => {
  const name: string = _.get(req, 'body.name', '');
  const email: string = _.get(req, 'body.email', '');
  const organization: string = _.get(req, 'body.organization', '');
  const attendant: Record<string, any> = await qrCodesService.createAttendant({
    name,
    email,
    organization
  });
  return res.json(attendant);
};
