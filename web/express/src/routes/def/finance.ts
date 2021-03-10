'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'finance';

const finance: Array<IRoute> = [
  {
    public: true,
    tags: ['Finance'],
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
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Finance'],
    summary: 'Get Companies',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/companies`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              market: { type: 'string' },
              group: { type: 'string' },
              symbol: { type: 'string' },
              name: { type: 'string' },
              industry: { type: 'string' },
              supersector: { type: 'string' },
              sector: { type: 'string' },
              subsector: { type: 'string' },
              listingDate: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Finance'],
    summary: 'Get Stock History',
    description: '',
    method: 'GET',
    request: {
      query: [
        { name: 'symbol', description: '', type: 'string', required: true },
        { name: 'from', description: '', type: 'number', required: true },
        { name: 'to', description: '', type: 'number', required: true }
      ],
      body: []
    },
    path: `${prefix}/history`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    tags: ['Finance'],
    summary: 'Sync Stock History',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [{ name: 'symbol', description: '', type: 'string', required: false }]
    },
    path: `${prefix}/history/sync`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            symbol: { type: 'string' },
            name: { type: 'string' },
            group: { type: 'string' },
            industry: { type: 'string' },
            subsector: { type: 'string' },
            history: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  date: { type: 'number' },
                  month: { type: 'number' },
                  symbol: { type: 'string' },
                  year: { type: 'number' },
                  close: { type: 'number' },
                  high: { type: 'number' },
                  low: { type: 'number' },
                  open: { type: 'number' },
                  timestamp: { type: 'number' },
                  volume: { type: 'number' }
                }
              }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    tags: ['Finance'],
    summary: 'Get Top Stock',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/top`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    tags: ['Finance'],
    summary: 'Get Stock Highlights',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'from', description: '', type: 'number', required: true },
        { name: 'to', description: '', type: 'number', required: true }
      ]
    },
    path: `${prefix}/highlights`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              average: { type: 'number' },
              diff: { type: 'number' },
              diffToMax: { type: 'number' },
              diffToMin: { type: 'number' },
              group: { type: 'string' },
              industry: { type: 'string' },
              latest: { type: 'number' },
              latestDate: { type: 'string' },
              low: { type: 'boolean' },
              max: { type: 'number' },
              maxDate: { type: 'string' },
              median: { type: 'number' },
              min: { type: 'number' },
              minDate: { type: 'string' },
              name: { type: 'string' },
              numberOfDates: { type: 'number' },
              start: { type: 'number' },
              startDate: { type: 'string' },
              subsector: { type: 'string' },
              symbol: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    tags: ['Finance'],
    summary: 'Get Potentials',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'from', description: '', type: 'number', required: true },
        { name: 'to', description: '', type: 'number', required: true }
      ]
    },
    path: `${prefix}/potentials`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              average: { type: 'number' },
              diff: { type: 'number' },
              diffToMax: { type: 'number' },
              diffToMin: { type: 'number' },
              group: { type: 'string' },
              industry: { type: 'string' },
              latest: { type: 'number' },
              latestDate: { type: 'string' },
              low: { type: 'boolean' },
              max: { type: 'number' },
              maxDate: { type: 'string' },
              median: { type: 'number' },
              min: { type: 'number' },
              minDate: { type: 'string' },
              name: { type: 'string' },
              numberOfDates: { type: 'number' },
              start: { type: 'number' },
              startDate: { type: 'string' },
              subsector: { type: 'string' },
              symbol: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    tags: ['Finance'],
    summary: 'Calculate Profit',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'buy', description: '', type: 'number', required: true },
        { name: 'sell', description: '', type: 'number', required: true },
        { name: 'volume', description: '', type: 'number', required: true }
      ]
    },
    path: `${prefix}/profit`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            profit: { type: 'number' }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

export default finance;
