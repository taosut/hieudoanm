'use strict';

const { NODE_ENV = 'development', URL_BASE = 'http://localhost:8080', PORT = '8080' } = process.env;
const port: number = parseInt(PORT, 10);

import dotenv from 'dotenv';
if (NODE_ENV !== 'production') dotenv.config({ path: './src/environments/dev.env' });

import _ from 'lodash';
import express from 'express';
import http from 'http';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { AddressInfo } from 'net';

import apis from './apis';
import docs from './docs';
import middlewares from './middlewares';
import { logger, telegramClient } from './libs';

const setTelegramWebhook = async () => {
  const base: string = NODE_ENV === 'production' ? URL_BASE : 'https://2963599d2895.ngrok.io';
  const telegramWebhook: string = `${base}/api/hooks/telegram`;
  await telegramClient.setWebhook(telegramWebhook);
};

const serverOnError: any = (error: any = {}) => {
  if (error.syscall !== 'listen') throw error;

  const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const serveStatic = (app: express.Application) => {
  app.use(express.static('web'));

  if (NODE_ENV === 'production') {
    app.route('/').get((req, res) => {
      res.sendFile(path.join(__dirname, 'web', 'index.html'));
    });
  }

  const swaggerUiOptions = { customSiteTitle: 'VIETNAM API DOCS' };
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs, swaggerUiOptions));

  if (NODE_ENV === 'production') {
    app.route('*').get((req, res) => {
      res.sendFile(path.join(__dirname, 'web', 'index.html'));
      // res.redirect('https://' + req.headers.host + req.url);
    });
  }
};

const startServer: Function = async () => {
  const app = express();
  await middlewares(app);
  await apis(app);

  app.post('/notification', (req, res) => {
    const channel: string = _.get(req, 'query.channel', 'x-bank');
    const body: Record<string, any> = _.get(req, 'body', {});
    socket.emit(`${channel}-notification`, body); // Updates Live Notification
    res.status(200).send('OK');
  });

  serveStatic(app);

  app.set('port', port);
  const server: http.Server = http.createServer(app);
  server.timeout = 600000; // 10 minutes
  server
    .listen(port, async () => {
      const addr: string | AddressInfo = server.address();
      const bind: string = typeof addr === 'string' ? `PIPE ${addr}` : `PORT ${addr.port}`;
      logger.info(`LISTENING ON ${bind}`);
      NODE_ENV === 'production' && (await setTelegramWebhook());
    })
    .on('error', serverOnError);

  const socket = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  socket.on('connection', (socket: any) => {
    const { handshake = {} } = socket;
    const { headers = {} } = handshake;
    const origin = _.get(headers, 'origin', '');
    const address = _.get(handshake, 'address', '');
    const userAgent = _.get(headers, 'user-agent', '');
    logger.info(`socket connection info ${JSON.stringify({ origin, address, userAgent })}`);
  });
};

// Start App
startServer();

// Handle Uncaught Exception
process.on('uncaughtException', (error: any) => {
  const utc: string = new Date().toUTCString();
  logger.error(`${utc} Uncaught Exception`);
  logger.error(error.stack);
  process.exit(1);
});

// Handle Unhandled Rejection Promise
process.on('unhandledRejection', (error: any) => {
  const utc: string = new Date().toUTCString();
  logger.error(`${utc} Unhandled Rejection`);
  logger.error(error.stack);
  process.exit(1);
});
