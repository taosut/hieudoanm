'use strict';

import _configs from './configs';

import Product from './product';
import Order from './order';
import Seller from './seller';
import Webhook from './webhook';

export default class Tiki {
  private version: string = 'v1';
  private base: string = '';

  public product: Product;
  public order: Order;
  public seller: Seller;
  public webhook: Webhook;

  constructor(apiKey: string, test: boolean = false) {
    const production: string = 'https://api.tiki.vn/integration';
    const sandbox: string = 'https://api-sandbox.tiki.vn/integration';
    const base = test ? `${production}/${this.version}` : `${sandbox}/${this.version}`;
    this.base = base;

    this.product = new Product({ apiKey, base });
    this.order = new Order({ apiKey, base });
    this.seller = new Seller({ apiKey, base });
    this.webhook = new Webhook({ apiKey, base });
  }
}
