'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'quotes';

const quotes: Array<IRoute> = [
  {
    public: true,
    tags: ['Quotes'],
    summary: 'Get Quotes',
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

export default quotes;
