'use strict';

import { currencies } from '../../constants';

import Utils from '../utils/utils';

export default class Base extends Utils {
  public currencies: Array<any> = currencies;
  public codes: Array<string> = currencies.map(currency => currency.code);
}
