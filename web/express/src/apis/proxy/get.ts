'use strict';

import { Request, Response } from 'express';

import { proxyService } from '../../services';

export default async (req: Request, res: Response) => {
  return await proxyService.getProxy(req, res);
};
