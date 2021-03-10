'use strict';

import { passportIndex, logger } from '../../libs';

const main = async () => {
  const visas = await passportIndex.getVisaRequirements();
  logger.info(`visas ${JSON.stringify(visas)}`);
};

main().catch(error => logger.error(error));
