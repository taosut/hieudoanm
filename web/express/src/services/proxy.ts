'use strict';

import url from 'url';
import request from 'request';
import { Request, Response } from 'express';

import { logger } from '../libs';

export default class ProxyService {
  public getProxy(req: Request, res: Response) {
    try {
      const requestPath = this.getRequestedUrl(req);
      logger.info(`requestUrl ${requestPath}`);
      const headers = this.getHeaders(req);
      logger.info(`headers ${headers}`);
      const { Host } = headers;
      logger.info(`Host ${Host}`);
      if (!requestPath || !Host) return res.end('no url found');
      const options = { url: requestPath, method: 'GET', headers };
      request(options)
        .on('error', (error: any) => {
          res.json(error.stack);
        })
        .pipe(res);
    } catch (error: any) {
      const message: string = error.stack;
      res.json({ message });
    }
  }

  private getRequestedUrl(req): string {
    const requestUrl: string = req.url.split('?url=')[1];
    return requestUrl || url.parse(req.url, true).query.url || req.url;
  }

  private getHeaders(req: any) {
    const { headers = {} } = req;
    const requestedHost = url.parse(this.getRequestedUrl(req)).hostname;
    headers['Host'] = requestedHost;
    return headers;
  }
}
