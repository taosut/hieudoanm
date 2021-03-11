'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'hooks';

const hooks: Array<IRoute> = [
  {
    public: false,
    tags: ['Hooks'],
    summary: 'Heroku Hook',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/heroku`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: false,
    tags: ['Hooks'],
    summary: 'Telegram Hook',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/telegram`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  }
];

export default hooks;
