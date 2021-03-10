'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { administrativeDivisionsService } from '../../../services';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const level_en: string = _.get(req, 'query.level_en', '');
  const macro_region_en: string = _.get(req, 'query.macro_region_en', '');
  const provinces = await administrativeDivisionsService.getProvinces({
    level_en,
    macro_region_en
  });
  return res.json(provinces);
};
