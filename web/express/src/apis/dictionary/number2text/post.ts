'use strict';

import { Request, Response } from 'express';

import { vnltk } from 'vnapis';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const { number = 0 } = req.body;
  const text = await vnltk.convertNumberToText(number);
  return res.json({ text });
};
