'use strict';

import bcrypt from 'bcryptjs';

export default class BCrypt {
  private rounds: number;

  constructor(rounds: number) {
    this.rounds = rounds;
  }

  public async hash(password: string): Promise<string> {
    const { rounds } = this;
    const salt = await bcrypt.genSalt(rounds);
    const hashPassword: string = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  public async compare(password: string, hashPassword: string): Promise<boolean> {
    const valid: boolean = await bcrypt.compare(password, hashPassword);
    return valid;
  }
}
