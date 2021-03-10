'use strict';

import express from 'express';

import basic from './basic';
import database from './database';

export default async (app: express.Application) => {
  await basic(app);
  await database(app);
};
