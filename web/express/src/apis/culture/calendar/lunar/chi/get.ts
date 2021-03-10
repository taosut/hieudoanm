'use strict';

import { Request, Response } from 'express';

import { calendar } from '../../../../../libs';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const listOfChi = calendar.getListOfChi();
  return res.json(listOfChi);
};
