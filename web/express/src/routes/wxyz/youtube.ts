'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'youtube';

const youtube: Array<IRoute> = [
  {
    public: true,
    tags: ['YouTube'],
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
    tags: ['YouTube'],
    summary: 'Get YouTube Trends',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'categoryId', description: '', type: 'number', required: false }],
      body: []
    },
    path: `${prefix}/trending`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              channelId: { type: 'string' },
              title: { type: 'string' },
              publishedAt: { type: 'string' },
              description: { type: 'string' },
              channelTitle: { type: 'string' },
              tags: {
                type: 'array',
                items: { type: 'string' }
              },
              categoryId: { type: 'string' },
              url: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['YouTube'],
    summary: 'Get YouTube Video Categories',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/video-categories`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              assignable: { type: 'string' },
              channelId: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

export default youtube;
