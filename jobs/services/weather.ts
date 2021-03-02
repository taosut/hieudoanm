'use strict';

import { weather } from 'vnapis';

import { convertJSONtoCSV } from '../libs';

export const syncAirVisualCities = async (): Promise<void> => {
  const cities = await weather.getAirVisualCities();
  if (!cities.length) return;
  const fields: Array<string> = ['city', 'state', 'country'];
  const path: string = `../docs/weather/cities.csv`;
  await convertJSONtoCSV(cities, fields, path);
};
