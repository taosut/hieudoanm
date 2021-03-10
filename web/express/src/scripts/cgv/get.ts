'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { cgv, logger } from '../../libs';

const main = async () => {
  const nowShowing = await cgv.getNowShowing();
  logger.info(`${JSON.stringify(nowShowing)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
