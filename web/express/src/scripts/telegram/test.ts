'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { logger, telegramClient } from '../../libs';

const TELEGRAM_CHAT_ID: number = parseInt(process.env.TELEGRAM_CHAT_ID, 10);

const main = async () => {
  const me = await telegramClient.getMe();
  logger.info(`${JSON.stringify(me)}`);

  const text = 'test';
  const result = await telegramClient.sendMessage(TELEGRAM_CHAT_ID, text);
  logger.info(`${JSON.stringify(result)}`);
};

main().catch(error => logger.error(error));
