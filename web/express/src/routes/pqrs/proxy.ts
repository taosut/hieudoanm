'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'proxy';

const proxy: Array<IRoute> = [
  {
    public: true,
    tags: ['Proxy'],
    summary: 'Proxy',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'url', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  }
];

export default proxy;
