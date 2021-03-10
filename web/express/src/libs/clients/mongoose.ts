'use strict';

import mongoose from 'mongoose';

export default class MongooseClient {
  public uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect(): Promise<void> {
    const self = this;

    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);

    return new Promise(resolve => {
      mongoose.connect(
        self.uri,
        { autoIndex: true, useNewUrlParser: true },
        (error: any = {}, database: any = {}) => {
          if (error) {
            console.error('MONGODB ERROR', error);
            resolve(error);
          }
          const { name = '' } = database;
          console.info('MONGODB SUCCESS', name);
          resolve(name);
        }
      );
    });
  }

  public async getReadyState(): Promise<number> {
    return mongoose.connection.readyState;
  }

  public modelize(name: string = '', template: any = {}): mongoose.model {
    const schema: mongoose.Schema = new mongoose.Schema(template);
    return mongoose.model(name, schema);
  }
}
