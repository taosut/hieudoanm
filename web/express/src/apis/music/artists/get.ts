'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { musicService } from '../../../services';

export default async (req: Request, res: Response) => {
  const artists: Array<any> = await musicService.getArtists();
  return res.json(artists);
};
