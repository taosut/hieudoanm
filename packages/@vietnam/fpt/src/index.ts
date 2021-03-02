'use strict';

import CV from './cv';
import NLP from './nlp';

export default class FPT {
  private base: string = 'https://api.fpt.ai';

  public cv: CV;
  public nlp: NLP;

  constructor(api_key: string) {
    const self = this;
    const { base } = self;

    this.cv = new CV(api_key, base);
    this.nlp = new NLP(api_key, base);
  }
}
