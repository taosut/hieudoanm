'use strict';

import { news, logger } from '../../libs';

const main = async () => {
  const ID: string = process.env.ID;
  const articles = await news[ID].getArticles();
  logger.info(`ID ${ID} articles ${JSON.stringify(articles)}`);
};

main().catch(error => logger.error(error));
