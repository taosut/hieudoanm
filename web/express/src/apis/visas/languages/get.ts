'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { visasService } from '../../../services';

export default async (req: Request, res: Response) => {
  const languages = await visasService.getLanguages();
  return res.json(languages);
};
