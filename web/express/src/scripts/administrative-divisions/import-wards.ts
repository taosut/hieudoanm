'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { dsAdministrativeDivisionsWard } from '../../data';
import { utils, logger, mongooseClient } from '../../libs';

const main = async () => {
  await mongooseClient.connect();

  await dsAdministrativeDivisionsWard.delete({});

  const rows = await utils.convertCSVtoJSON('./wards.csv');

  for (const row of rows) {
    const { province, district, ward } = row;
    const res = await dsAdministrativeDivisionsWard.updateOne(
      { province, district, ward },
      { province, district, ward }
    );
    logger.info(`${JSON.stringify(res)}`);
  }

  process.exit(0);
};

main().catch(error => logger.error(error));
