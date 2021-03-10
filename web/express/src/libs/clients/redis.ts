'use strict';

import redis from 'redis';

export default class Redis {
  private host: string = '';
  private port: number = 0;
  private password: string = '';

  private client: any;

  constructor(host: string, port: number, password: string) {
    this.host = host;
    this.port = port;
    this.password = password;
  }

  public async connect(): Promise<void> {
    const { host, port, password } = this;
    this.client = redis.createClient({ host, port, password });

    this.client.on('connect', () => {
      console.info('REDIS SUCCESS');
    });

    this.client.on('error', error => {
      console.error(error);
    });
  }

  public async get(key: string): Promise<string> {
    return new Promise(resolve => {
      this.client.get(key, (error, reply) => {
        if (error) {
          console.error('error', error);
          return resolve('');
        }
        resolve(reply);
      });
    });
  }

  public async set(key: string, value: string): Promise<void> {
    return await this.client.set(key, value);
  }

  public async setex(key: string, value: string, expiredSeconds: number = 0): Promise<void> {
    return await this.client.setex(key, expiredSeconds, value);
  }

  public async del(key: string): Promise<void> {
    return await this.client.del(key);
  }
}
