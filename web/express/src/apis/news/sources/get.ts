'use strict';

import { Request, Response } from 'express';

import { newsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response> => {
  const sources = newsService.getSources();
  const total: number = sources.length;
  return res.json({ total, sources });
};
