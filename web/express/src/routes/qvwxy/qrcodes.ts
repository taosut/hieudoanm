'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'qrcodes';

const qrcodes: Array<IRoute> = [
  {
    public: true,
    tags: ['QRCodes'],
    summary: 'Get QRCode Info',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'id', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            organization: { type: 'string' }
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
    tags: ['QRCodes'],
    summary: 'Create QRCode',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'name', description: '', type: 'string', required: true },
        { name: 'email', description: '', type: 'string', required: true },
        { name: 'organization', description: '', type: 'string', required: true }
      ]
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
  }
];

export default qrcodes;
