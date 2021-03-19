'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'news';

const news: Array<IRoute> = [
  {
    public: true,
    tags: ['News'],
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
    tags: ['News'],
    summary: 'Get Trends',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/trends`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            year: { type: 'number' },
            month: { type: 'number' },
            date: { type: 'number' },
            hour: { type: 'number' },
            total: { type: 'number' },
            trends: {
              type: 'array',
              items: { type: 'string' }
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
    tags: ['News'],
    summary: 'Get Sources',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/sources`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            sources: {
              type: 'array',
              items: { type: 'string' }
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
    tags: ['News'],
    summary: 'Get Categories',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'source', description: '', type: 'string', required: false }],
      body: []
    },
    path: `${prefix}/categories`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            categories: {
              type: 'array',
              items: { type: 'string' }
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
    tags: ['News'],
    summary: 'Get Articles',
    description: '',
    method: 'GET',
    request: {
      query: [
        { name: 'category', description: '', type: 'string', required: false },
        { name: 'source', description: '', type: 'string', required: false },
        { name: 'max', description: '', type: 'number', required: false }
      ],
      body: []
    },
    path: `${prefix}/articles`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              url: { type: 'string' },
              source: { type: 'string' },
              sourceURL: { type: 'string' },
              description: { type: 'string' },
              publishedDate: { type: 'string' },
              year: { type: 'number' },
              month: { type: 'number' },
              date: { type: 'number' },
              hours: { type: 'number' },
              minutes: { type: 'number' },
              seconds: { type: 'number' },
              timestamp: { type: 'number' }
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

export default news;
