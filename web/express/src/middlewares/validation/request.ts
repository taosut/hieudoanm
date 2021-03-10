'use strict';

import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

import { IRoute, IRouteRequestParameter } from '../../models/interfaces';
import routes from '../../routes';

export default async (req: Request, res: Response, next: NextFunction) => {
  const path: string = _.get(req, 'route.path', '');
  const method: string = _.get(req, 'route.method', '').toUpperCase();
  const endpoint: IRoute = routes.find(
    route => `/api/${route.path}` === path && route.method === method
  ) || {
    public: true,
    tags: [],
    summary: '',
    description: '',
    method: 'OPTION',
    path: '',
    middlewares: [],
    request: { query: [], body: [] },
    responses: {}
  };
  const {
    request: { query = [], body = [] }
  } = endpoint;

  if (_.isEmpty(query) && _.isEmpty(body)) {
    return next();
  }

  if (!_.isEmpty(query)) {
    const message = processQueryRequest(req, query);
    if (message) {
      return res.status(400).json({ error: true, message });
    }
  }

  if (!_.isEmpty(body)) {
    const message = processBodyRequest(req, body);
    if (message) {
      return res.status(400).json({ error: true, message });
    }
  }

  next();
};

const processQueryRequest = (req: Request, query: Array<IRouteRequestParameter> = []): string => {
  for (const parameter of query) {
    const { name, type, required = false } = parameter;
    if (required && (_.isUndefined(req.query[name]) || !req.query[name])) {
      return `Missing required query string "${name}"`;
    }
  }
  return '';
};

const processBodyRequest = (req: Request, body: Array<IRouteRequestParameter> = []): string => {
  for (const parameter of body) {
    const { name, type, required = false } = parameter;
    if (required && (_.isUndefined(req.body[name]) || !req.body[name])) {
      return `Missing required request body "${name}"`;
    }
  }
  return '';
};
