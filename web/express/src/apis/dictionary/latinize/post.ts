'use strict';

import { Request, Response } from 'express';

import { vnltk } from 'vnapis';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const { text = '' } = req.body;
  const result = await vnltk.latinize(text);
  return res.json({ result });
};
