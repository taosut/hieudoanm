'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { openAPIsService } from '../../services';

export default async (req: Request, res: Response) => {
  const type_id: string = _.get(req, 'query.type_id', '');
  const technologies: Array<any> = await openAPIsService.getTechnologies(type_id);
  return res.json(technologies);
};
