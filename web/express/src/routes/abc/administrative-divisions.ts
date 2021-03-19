'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'administrative-divisions';

const administrativeDivisions: Array<IRoute> = [
  {
    public: true,
    path: `${prefix}/macro-regions`,
    method: 'GET',
    tags: ['Administrative Divisions'],
    summary: 'Get Marco Regions',
    description: '',
    request: {
      query: [{ name: 'province_id', description: '', type: 'string', required: false }],
      body: []
    },
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      400: {
        description: 'Bad Request',
        schema: {}
      }
    }
  },
  {
    public: true,
    method: 'GET',
    tags: ['Administrative Divisions'],
    summary: 'Get Regions',
    description: '',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/regions`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      400: {
        description: '',
        schema: {
          type: 'object',
          properties: { message: { type: 'string' } }
        }
      }
    }
  },
  {
    public: true,
    path: `${prefix}/provinces`,
    method: 'GET',
    tags: ['Administrative Divisions'],
    summary: 'Get Provinces',
    description: '',
    request: {
      query: [
        { name: 'level_en', description: '', type: 'string', required: false },
        { name: 'macro_region_en', description: '', type: 'string', required: false }
      ],
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
              province_id: { type: 'string' },
              name: { type: 'string' },
              capital: { type: 'string' },
              level: { type: 'string' },
              level_en: { type: 'string' },
              macro_region: { type: 'string' },
              macro_region_en: { type: 'string' },
              region: { type: 'string' },
              region_en: { type: 'string' }
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
    path: `${prefix}/districts`,
    method: 'GET',
    tags: ['Administrative Divisions'],
    summary: 'Get Districts',
    description: '',
    request: {
      query: [{ name: 'province_id', description: '', type: 'string', required: true }],
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
              name: { type: 'string' },
              level: { type: 'string' },
              level_en: { type: 'string' },
              province: { type: 'string' },
              province_id: { type: 'string' }
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
    method: 'GET',
    tags: ['Administrative Divisions'],
    summary: 'Get Wards',
    description: '',
    request: {
      query: [
        { name: 'skip', description: '', type: 'number', required: false },
        { name: 'limit', description: '', type: 'number', required: false }
      ],
      body: []
    },
    path: `${prefix}/wards`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              district: { type: 'string' },
              province: { type: 'string' },
              ward: { type: 'string' }
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
    method: 'GET',
    tags: ['Administrative Divisions'],
    summary: 'Get Total Wards',
    description: '',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/wards/total`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            total: { type: 'number' }
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
    method: 'GET',
    tags: ['Administrative Divisions'],
    summary: 'Get Postal Codes',
    description: '',
    request: {
      query: [{ name: 'province_id', description: '', type: 'string', required: false }],
      body: []
    },
    path: `${prefix}/postal-codes`,
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
              province: { type: 'string' },
              province_id: { type: 'string' }
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

export default administrativeDivisions;
