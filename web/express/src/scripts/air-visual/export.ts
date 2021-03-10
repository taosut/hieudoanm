'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { airVisual, logger } from '../../libs';

const main = async () => {
  const countries = await airVisual.getCountries();
  logger.info(`countries ${JSON.stringify(countries)}`);

  const country: string = 'Vietnam';

  const states = await airVisual.getStates('Vietnam');
  logger.info(`states ${JSON.stringify(states)}`);

  let cities = [];
  for (const state of states) {
    const _cities = await airVisual.getCities(state, country);
    cities = cities.concat(
      _cities.map((city: string) => {
        return { city, state, country };
      })
    );
  }

  logger.info(`cities ${JSON.stringify(cities)}`);
};

main().catch(error => logger.error(error));
