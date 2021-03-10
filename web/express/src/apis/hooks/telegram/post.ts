'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { telegramService } from '../../../services';

export default async (req: Request, res: Response) => {
  const body = _.get(req, 'body', {});
  await telegramService.processWebhook(body);
  return res.status(200).json({ status: 'OK' });
};
