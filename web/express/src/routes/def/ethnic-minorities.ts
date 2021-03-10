'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'ethnic-minorities';

const ethnicMinorities: Array<IRoute> = [
  {
    public: true,
    tags: ['Ethnic Minorities'],
    summary: 'Get Ethnic Minorities',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'type_en', description: '', type: 'string', required: false }],
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
              type_en: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

export default ethnicMinorities;
