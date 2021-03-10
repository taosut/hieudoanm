'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { logger, telegramClient } from '../../../libs';

const TELEGRAM_CHAT_ID: number = parseInt(process.env.TELEGRAM_CHAT_ID, 10);

export default async (req: Request, res: Response) => {
  const body: Record<string, any> = _.get(req, 'body', {});
  logger.info(`hooks/heroku body ${JSON.stringify(body)}`);
  const message: string = `${JSON.stringify(body)}`;
  await telegramClient.sendMessage(TELEGRAM_CHAT_ID, message);
  return res.status(200).json({ status: 'OK' });
};
