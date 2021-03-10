'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import fs from 'fs';
import _ from 'lodash';
import json2csv from 'json2csv';
const { parse } = json2csv;

import { randomUser, logger } from '../../libs';

const main = async () => {
  const results = await randomUser.generate({
    results: 100,
    nat: 'US',
    password: 'upper,lower,number,8-64'
  });
  const testUsers = results.map(result => {
    const first: string = _.get(result, 'name.first', '');
    const last: string = _.get(result, 'name.last', '');
    const name: string = `${first} ${last}`;
    const username: string = _.get(result, 'login.username', '');
    const password: string = _.get(result, 'login.password', '').toString();
    const cell: string = _.get(result, 'cell', '');
    const email: string = _.get(result, 'email', '');
    return { name, username, password, email, cell };
  });
  const fields = ['name', 'username', 'password', 'email', 'cell'];
  const csv = parse(testUsers, { fields });
  await fs.writeFileSync('./test-users.csv', csv);
  logger.info(`${JSON.stringify(testUsers)}`);
  process.exit(0);
};

main().catch(error => logger.error(error));
