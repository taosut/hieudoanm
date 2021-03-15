'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = `banks`;

const banks: Array<IRoute> = [
  {
    public: true,
    path: `${prefix}`,
    method: `GET`,
    tags: ['Banks'],
    summary: 'Get Banks',
    description: '',
    request: {
      query: [],
      body: []
    },
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              name: { type: 'string' },
              name_en: { type: 'string' },
              name_short: { type: 'string' },
              url: { type: 'string' },
              type: { type: 'string' },
              type_en: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    path: `${prefix}/forex/currencies`,
    method: 'GET',
    tags: ['Banks'],
    summary: 'Get Forex Currencies',
    description: '',
    request: {
      query: [],
      body: []
    },
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    path: `${prefix}/forex/rates`,
    method: `GET`,
    tags: ['Banks'],
    summary: 'Get Forex Rates',
    description: '',
    request: {
      query: [],
      body: []
    },
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              bank: { type: 'string' },
              code: { type: 'string' },
              buyCash: { type: 'number' },
              buyTransfer: { type: 'number' },
              sellCash: { type: 'number' },
              sellTransfer: { type: 'number' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    path: `${prefix}/forex/rates/:id`,
    method: `GET`,
    tags: ['Banks'],
    summary: 'Get Forex Rates by Bank',
    description: '',
    request: {
      query: [],
      body: []
    },
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              buyCash: { type: 'number' },
              buyTransfer: { type: 'number' },
              sellCash: { type: 'number' },
              sellTransfer: { type: 'number' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    path: `${prefix}/forex/sync`,
    method: `POST`,
    tags: ['Banks'],
    summary: 'Sync Forex Rates',
    description: '',
    request: {
      query: [],
      body: [{ name: 'id', description: '', required: true, type: 'string' }]
    },
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string' }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    path: `${prefix}/upload`,
    method: `POST`,
    tags: ['Banks'],
    summary: 'Upload Image',
    description: '',
    request: {
      query: [],
      body: []
    },
    middlewares: ['upload'],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      },
      400: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }
];

export default banks;
