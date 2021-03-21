'use strict';

import { IRoute } from '../models/interfaces';

import { administrativeDivisions, banks, culture } from './abc';
import { dictionary, ethnicMinorities, finance } from './def';
import { government, hooks, information } from './ghi';
import { licensePlates, music, news, openAPIs } from './lmno';
import { qrcodes, visas, weather, x, youtube } from './qvwxy';

const routes: Array<IRoute> = [].concat(
  administrativeDivisions,
  banks,
  culture,
  dictionary,
  ethnicMinorities,
  finance,
  government,
  hooks,
  information,
  licensePlates,
  music,
  news,
  openAPIs,
  qrcodes,
  visas,
  weather,
  x,
  youtube
);

export default routes;
