'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'tools';

const tools: Array<IRoute> = [
  {
    public: false,
    tags: ['Tools'],
    summary: 'Generate MD5',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/md5`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  }
];

export default tools;
