'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'government';

const government: Array<IRoute> = [
  {
    public: true,
    tags: ['Government'],
    summary: 'Get Ministries',
    description: '',
    method: `GET`,
    request: {
      query: [{ name: 'level_en', description: '', type: 'string', required: false }],
      body: []
    },
    path: `${prefix}/ministries`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              short: { type: 'string' },
              name: { type: 'string' },
              name_en: { type: 'string' },
              level: { type: 'string' },
              level_en: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Government'],
    summary: 'Get Ministers',
    description: '',
    method: `GET`,
    request: {
      query: [{ name: 'ministry', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}/ministers`,
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
              title_en: { type: 'string' },
              title_short: { type: 'string' },
              name: { type: 'string' },
              gender: { type: 'string' },
              gender_en: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Government'],
    summary: 'Get Incumbents',
    description: '',
    method: `GET`,
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/incumbents`,
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
              title_en: { type: 'string' },
              title_short: { type: 'string' },
              name: { type: 'string' },
              gender: { type: 'string' },
              gender_en: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Government'],
    summary: 'Get General Secretaries',
    description: '',
    method: `GET`,
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/general-secretaries`,
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
              title_en: { type: 'string' },
              title_short: { type: 'string' },
              name: { type: 'string' },
              gender: { type: 'string' },
              gender_en: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Government'],
    summary: 'Get Presidents',
    description: '',
    method: `GET`,
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/presidents`,
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
              title_en: { type: 'string' },
              title_short: { type: 'string' },
              name: { type: 'string' },
              gender: { type: 'string' },
              gender_en: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Government'],
    summary: 'Get Prime Ministers',
    description: '',
    method: `GET`,
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/prime-ministers`,
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
              title_en: { type: 'string' },
              title_short: { type: 'string' },
              name: { type: 'string' },
              gender: { type: 'string' },
              gender_en: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Government'],
    summary: 'Get National Assembly Chairs',
    description: '',
    method: `GET`,
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/national-assembly/chairs`,
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
              title_en: { type: 'string' },
              title_short: { type: 'string' },
              name: { type: 'string' },
              gender: { type: 'string' },
              gender_en: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Government'],
    summary: 'Get National Assembly Members',
    description: '',
    method: `GET`,
    request: {
      query: [{ name: 'no', description: '', type: 'number', required: true }],
      body: []
    },
    path: `${prefix}/national-assembly/members`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              no: { type: 'number' },
              name: { type: 'string' },
              date_of_birth: { type: 'string' },
              city_of_birth: { type: 'string' },
              gender: { type: 'string' },
              degree: { type: 'string' },
              province: { type: 'string' },
              district: { type: 'string' },
              percentage: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

export default government;
