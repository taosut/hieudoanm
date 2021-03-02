'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import DevTo from '../src/index';

const { DEV_TO_API_KEY } = process.env;

const main = async () => {
  const devTo = new DevTo(DEV_TO_API_KEY);

  const articles = await devTo.getArticles();

  console.log(articles);
};

main().catch(error => console.error(error.stack));
