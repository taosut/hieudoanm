'use strict';

import { liveScore, logger } from '../../libs';

const main = async () => {
  const vleague = await liveScore.getVLeague();
  logger.info(`vleague ${JSON.stringify(vleague)}`);
};

main().catch((error: any) => logger.error(error));
