'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'open-apis';

const openAPIs: Array<IRoute> = [
  {
    public: true,
    tags: ['Open APIs'],
    summary: 'Get Open APIs',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'type_id', description: '', type: 'string', required: false }],
      body: []
    },
    path: `${prefix}`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { type: 'string' },
              type_id: { type: 'string' },
              url: { type: 'string' },
              npm: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

export default openAPIs;
