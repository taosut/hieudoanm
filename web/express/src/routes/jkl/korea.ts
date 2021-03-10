'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'korea';

const korea: Array<IRoute> = [
  {
    public: true,
    tags: ['Korea'],
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
  }
];

export default korea;
