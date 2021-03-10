'use strict';

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const URL_BASE: string = process.env.URL_BASE || '';

const host: string = URL_BASE.replace('http://', '').replace('https://', '');
const scheme: string = NODE_ENV === 'development' ? 'http' : 'https';

export default {
  swagger: '2.0',
  info: {
    description: 'VIETNAM REST API',
    version: '1.0.0',
    title: 'VIETNAM API',
    contact: {
      email: 'vietnamdb29@gmail.com'
    },
    license: {
      name: 'MIT',
      url: 'https://mit-license.org/'
    }
  },
  schemes: [scheme],
  host: host,
  basePath: '/api'
};
