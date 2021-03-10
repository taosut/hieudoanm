'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { xService } from '../../../../services';

export default async (req: Request, res: Response) => {
  const url: string = xService.getGoogleAuthURL();
  return res.json({ url });
};
