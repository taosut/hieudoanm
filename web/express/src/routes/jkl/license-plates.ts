'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'license-plates';

const licensePlates: Array<IRoute> = [
  {
    public: true,
    tags: ['License Plates'],
    summary: 'Get License Plates',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'license', description: '', type: 'string', required: false }],
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
              license: { type: 'string' },
              definition: { type: 'string' },
              type: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

export default licensePlates;
