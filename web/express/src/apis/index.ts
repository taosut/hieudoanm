'use strict';

import { Request, Response } from 'express';

import { logger, statuses } from '../libs';
import routes from '../routes';

export default app => {
  const base: string = '/api';
  app.get(`${base}`, async (req: Request, res: Response) => {
    const prefixes: Array<string> = routes
      .map(route => {
        const { path } = route;
        const [prefix] = path.split('/');
        return prefix;
      })
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
    const heroku = await statuses.getHerokuStatus();
    return res.json({ status: 'OK', heroku, prefixes });
  });

  routes.forEach(route => {
    const { method, path, middlewares = [] } = route;
    const _method = method.toLowerCase();
    const { default: handler } = require(`./${path}/${_method}`);
    middlewares.unshift('validation/request');
    middlewares.unshift('track-ip');
    const _middlewares = [];
    for (const middleware of middlewares) {
      const { default: _middleware } = require(`../middlewares/${middleware}`);
      _middlewares.push(_middleware);
    }
    const url: string = `${base}/${path}`;
    logger.info(`route info ${JSON.stringify({ method, url, middlewares, handler })}`);
    const handlers: Array<any> = [].concat(_middlewares, handler);
    app[_method](url, ...handlers);
  });
};
