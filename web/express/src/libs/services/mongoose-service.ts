'use strict';

import mongoose from 'mongoose';

interface IFindOptions {
  skip?: number;
  limit?: number;
  selectedFields?: Array<string>;
  excludedFields?: Array<string>;
  sort?: string | Record<string, any>;
  populate?: string;
}

interface IFindOneOptions {
  selectedFields?: Array<string>;
  excludedFields?: Array<string>;
  sort?: Record<string, any>;
}

interface IUpdateOptions {
  selectedFields?: Array<string>;
  excludedFields?: Array<string>;
  upsert?: boolean;
  new?: boolean;
}

export default class MongooseService {
  public model: mongoose.model;

  constructor(model: mongoose.model = {}) {
    this.model = model;
  }

  public parseProjection(
    selectedFields: Array<string> = [],
    excludedFields: Array<string> = []
  ): Record<string, any> {
    if (selectedFields.length === 0 && excludedFields.length === 0) return {};

    const project: Record<string, any> = {};

    selectedFields.forEach(field => {
      project[field] = 1;
    });

    excludedFields.forEach(field => {
      project[field] = 0;
    });

    return project;
  }

  public async count(query: any = {}): Promise<number> {
    const self = this;

    return new Promise(resolve => {
      self.model.countDocuments(query, (error = {}, result = 0) => {
        if (error) console.error(error);
        resolve(result);
      });
    });
  }

  public async find(
    query: any = {},
    options: IFindOptions = {
      skip: 0,
      limit: null,
      selectedFields: [],
      excludedFields: [],
      sort: '',
      populate: ''
    }
  ): Promise<Array<any>> {
    const self = this;

    const {
      skip = 0,
      limit = null,
      selectedFields = [],
      excludedFields = [],
      sort = '',
      populate = ''
    } = options;

    const projection: any = await self.parseProjection(selectedFields, excludedFields);

    return new Promise(resolve => {
      self.model
        .find(query)
        .skip(skip)
        .limit(limit)
        .select(projection)
        .sort(sort)
        .populate(populate)
        .lean()
        .exec((error = {}, docs: mongoose.Types.DocumentArray = []) => {
          if (error) console.error(error);
          resolve(docs);
        });
    });
  }

  public async findOne(query: any = {}, options: IFindOneOptions = {}): Promise<any> {
    const self = this;

    const { selectedFields = [], excludedFields = [], sort = '' } = options;

    const projection: any = await self.parseProjection(selectedFields, excludedFields);

    return new Promise(resolve => {
      self.model
        .findOne(query)
        .select(projection)
        .sort(sort)
        .lean()
        .exec((error = {}, document: mongoose.Types.Document = {}) => {
          if (error) console.error(error);
          resolve(document || {});
        });
    });
  }

  public async findById(id: string = ''): Promise<any> {
    const self = this;

    return new Promise(resolve => {
      self.model
        .findById(id)
        .lean()
        .exec((error: any = {}, document: mongoose.Types.Document = {}) => {
          if (error) console.error(error);
          resolve(document || {});
        });
    });
  }

  public async create(body: any = {}): Promise<any> {
    const self = this;

    return new Promise((resolve, reject) => {
      self.model.create(body, (error = {}, document = {}) => {
        if (error) {
          return reject(error);
        }
        return resolve(document);
      });
    });
  }

  public async createMany(list: Array<any> = []): Promise<Array<any>> {
    const self = this;

    return new Promise(resolve => {
      self.model.insertMany(list, { ordered: false }, (error = {}, docs = []) => {
        if (error) console.error(error);
        resolve(docs);
      });
    });
  }

  public async update(
    query: any = {},
    document: any = {},
    options: IUpdateOptions = {}
  ): Promise<any> {
    const self = this;

    options = Object.assign({ upsert: true, new: true }, options);

    return new Promise(resolve => {
      self.model.updateMany(query, { $set: document }, options, (error = {}, response = {}) => {
        if (error) console.error(error);
        resolve(response);
      });
    });
  }

  public async updateOne(
    query: any = {},
    document: any = {},
    options: IUpdateOptions = {}
  ): Promise<any> {
    const self = this;
    options = Object.assign({ upsert: true, new: true }, options);
    const { selectedFields = [], excludedFields = [] } = options;
    const projection: any = await self.parseProjection(selectedFields, excludedFields);

    return new Promise(resolve => {
      self.model
        .findOneAndUpdate(query, { $set: document }, options, (error = {}, response = {}) => {})
        .select(projection)
        .exec((error: any = {}, document: mongoose.Types.Document = {}) => {
          if (error) {
            console.error(error);
          }
          resolve(document);
        });
    });
  }

  public async updateById(
    id: string = '',
    document: any = {},
    options: IUpdateOptions = {}
  ): Promise<any> {
    const self = this;

    options = Object.assign({ upsert: true, new: true }, options);

    return new Promise(resolve => {
      self.model.findByIdAndUpdate(id, { $set: document }, options, (error = {}, response = {}) => {
        if (error) console.error(error);
        resolve(response);
      });
    });
  }

  public async delete(query: any = {}): Promise<Record<string, any>> {
    const self = this;
    const res: Record<string, any> = await self.model.deleteMany(query);
    return res;
  }

  public async deleteOne(query: any = {}): Promise<string> {
    const self = this;

    return new Promise(resolve => {
      self.model.deleteOne(query, (error: any = {}) => {
        if (error) {
          console.error(error);
          resolve('ERROR');
        }
        resolve('OK');
      });
    });
  }

  public async deleteById(id: string = ''): Promise<string> {
    const self = this;

    return new Promise(resolve => {
      self.model.findByIdAndDelete(id, (error: any = {}) => {
        if (error) {
          console.error(error);
          resolve('ERROR');
        }
        resolve('OK');
      });
    });
  }

  public async bulkWrite(operations: Array<any>, options: any = {}): Promise<string> {
    const self = this;
    return new Promise(resolve => {
      self.model.bulkWrite(operations, options, (res: any = {}) => {
        resolve(res);
      });
    });
  }
}
