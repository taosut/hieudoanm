'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'information';

const phones: Array<IRoute> = [
  {
    public: true,
    tags: ['Information'],
    summary: 'Get Phones Prefixes',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'prefix', description: '', type: 'string', required: false }],
      body: []
    },
    path: `${prefix}/phones/prefixes`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              prefix: { type: 'string' },
              provider: { type: 'string' },
              provider_id: { type: 'string' }
            }
          }
        }
      },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: true,
    tags: ['Information'],
    summary: 'Get Phones Providers',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/phones/providers`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              provider: { type: 'string' },
              prefixes: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: true,
    tags: ['Information'],
    summary: 'Get Phone Provider',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/phones/provider`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const information: Array<IRoute> = [].concat(phones);

export default information;
