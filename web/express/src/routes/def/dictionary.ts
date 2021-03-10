'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'dictionary';

const dictionary: Array<IRoute> = [
  {
    public: true,
    tags: ['Dictionary'],
    summary: 'Get Status',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Dictionary'],
    summary: 'Number to Text',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/number2text`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Dictionary'],
    summary: 'Latinize',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/latinize`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  }
];

export default dictionary;
