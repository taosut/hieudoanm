'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { qrCodesService } from '../../services';

export default async (req: Request, res: Response) => {
  const id: string = _.get(req, 'query.id', '');
  const attendant: Record<string, any> = await qrCodesService.getAttendant(id);
  return res.json(attendant);
};
