'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'reddit';

const reddit: Array<IRoute> = [
  {
    public: true,
    tags: ['Reddit'],
    summary: 'Reddit',
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
  }
];

export default reddit;
