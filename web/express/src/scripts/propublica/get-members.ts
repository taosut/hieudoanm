'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { proPublica, logger } from '../../libs';

const main = async () => {
  const members = await proPublica.congress.getMembers(116, 'house');
  logger.info(`members ${JSON.stringify(members)}`);
};

main().catch(error => logger.error(error));
