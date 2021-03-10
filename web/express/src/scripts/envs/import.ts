'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/prod.env' });

import fs from 'fs';
import { exec } from 'child_process';

const APP = process.env.APP || 'vietnamdb';

import { logger } from '../../libs';

const execute = (key: string, value: string) => {
  return new Promise(resolve => {
    exec(`heroku config:set ${key}=${value} --app ${APP}`, (error, stdout, stderr) => {
      if (error) {
        return resolve(`error: ${error.message}`);
      }
      if (stderr) {
        return resolve(`stderr: ${stderr}`);
      }
      resolve(`stdout: ${stdout}`);
    });
  });
};

const main = async () => {
  const content = await fs.readFileSync('./src/environments/prod.env', 'utf-8');
  const envs = content
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.includes('='))
    .sort()
    .map((line: string) => {
      const items = line.split('=');
      const [key] = items;
      items.shift();
      const value: string = items.join('=');
      return { key, value };
    });

  for (const env of envs) {
    const { key = '', value = '' } = env;
    if (!key || !value) continue;
    const response = await execute(key, value);
    logger.info(`execute response ${response}`);
  }
};

main().catch(error => logger.error(error));
