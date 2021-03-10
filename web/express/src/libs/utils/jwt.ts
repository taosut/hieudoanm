'use strict';

import jwt from 'jsonwebtoken';

export default class JWT {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  verify(token: string): any {
    const { secret } = this;
    return jwt.verify(token, secret);
  }

  sign(payload: any): string {
    const { secret } = this;
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }
}
