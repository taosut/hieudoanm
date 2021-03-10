'use strict';

import winston from 'winston';

export default class Logger {
  private logger: winston.Logger;

  constructor(levelIndex: number = 3) {
    const levels: Array<string> = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
    const level: string = levels[levelIndex];

    this.logger = winston.createLogger({
      level,
      format: winston.format.json(),
      defaultMeta: { service: 'vietnamdb-service' },
      transports: [new winston.transports.Console()]
    });
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public http(message: string) {
    this.logger.http(message);
  }

  public verbose(message: string) {
    this.logger.verbose(message);
  }

  public debug(message: string) {
    this.logger.debug(message);
  }

  public silly(message: string) {
    this.logger.silly(message);
  }
}
