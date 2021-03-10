'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { ssi, logger } from '../../libs';

const main = async () => {
  const companies = await ssi.getListedCompanies();
  logger.info(`companies ${JSON.stringify(companies)}`);
  process.exit(0);
};

main().catch(error => logger.error(error));
