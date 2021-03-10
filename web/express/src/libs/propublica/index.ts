'use strict';

import Congress from './congress';

export default class ProPublica {
  public congress: Congress;

  constructor(apiKey: string) {
    this.congress = new Congress(apiKey);
  }
}
