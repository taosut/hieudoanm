'use strict';

import Article from './article';
import OfficialAccount from './official-account';
import Shop from './shop';
import Social from './social';

export default class Zalo {
  private openAPI: string = 'https://openapi.zalo.me/v2.0/';
  private graphAPI: string = 'https://graph.zalo.me/v2.0/';

  public article: Article;
  public officialAccount: OfficialAccount;
  public shop: Shop;
  public social: Social;

  constructor(access_token: string) {
    const { openAPI, graphAPI } = this;

    this.article = new Article(access_token, openAPI);
    this.officialAccount = new OfficialAccount(access_token, openAPI);
    this.shop = new Shop(access_token, openAPI);
    this.social = new Social(access_token, graphAPI);
  }
}
