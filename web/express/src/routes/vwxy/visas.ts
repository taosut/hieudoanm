'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'visas';

const visas: Array<IRoute> = [
  {
    public: true,
    tags: ['Visas'],
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
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: true,
    tags: ['Visas'],
    summary: 'Get Languages',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/languages`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              country: { type: 'string' },
              requirement: { type: 'string' }
            }
          }
        }
      },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

export default visas;
