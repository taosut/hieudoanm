'use strict';

import NodeCache from 'node-cache';

export default class Cache {
  public cache: any;

  constructor(ttlSeconds: number = 0) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 1.2,
      useClones: false
    });
  }

  set(key: string = '', value: any): any {
    const self = this;
    const success: any = self.cache.set(key, value, 10000);
    return success;
  }

  get(key: string = ''): any {
    const self = this;
    const value: any = self.cache.get(key);
    return value;
  }

  delete(key: string = ''): void {
    const self = this;
    self.cache.del(key);
  }

  deleteAll(): void {
    const self = this;
    self.cache.flushAll();
  }
}
