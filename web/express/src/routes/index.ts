'use strict';

import { IRoute } from '../models/interfaces';

import { administrativeDivisions, banks, culture } from './abc';
import { dictionary, ethnicMinorities, finance } from './def';
import { government, hooks, information } from './ghi';
import { justice, korea, licensePlates } from './jkl';
import { music, news, openAPIs } from './mno';
import { proxy, status } from './pqrs';
import { visas } from './tuv';
import { weather, x, youtube } from './wxyz';

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
  justice,
  korea,
  licensePlates,
  music,
  news,
  openAPIs,
  proxy,
  status,
  visas,
  weather,
  x,
  youtube
);

export default routes;
