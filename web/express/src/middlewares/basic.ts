'use strict';

import _ from 'lodash';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import methodOverride from 'method-override';
import morgan from 'morgan';

const SECRET_HEROKU_WEBHOOK: string = process.env.SECRET_HEROKU_WEBHOOK || '';
const NODE_ENV: string = process.env.NODE_ENV || 'development';

export default async (app: express.Application) => {
  app.use(morgan('combined')); // Logging should be first

  app.use(helmet());

  app.use(cors());
  // app.use(cors({ origin, credentials: true, methods }));

  const windowMs: number = 60 * 1000; // 1 minute
  const max: number = 100; // limit each IP to 100 requests per windowMs
  const limiter = rateLimit({ windowMs, max }); // Rate Limit
  app.use(limiter);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParser.json({
      limit: '60mb',
      verify: (req: Request, res: Response, buf: Buffer) => {
        const url: string = _.get(req, 'url', '');
        if (url.includes('/hooks/heroku')) {
          const hmac: string = req.header('Heroku-Webhook-Hmac-SHA256') || '';
          const digest = crypto
            .createHmac('sha256', SECRET_HEROKU_WEBHOOK)
            .update(buf)
            .digest('base64');
          if (hmac !== digest) {
            res.status(401).send('Unauthorized');
          }
        }
      }
    })
  ); // For POST

  app.use(methodOverride()); // For PUT and DELETE

  app.use(compression()); // Compression

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Add HSTS
    const oneYear: number = 60 * 60 * 24 * 365;
    res.set('Strict-Transport-Security', 'max-age=' + oneYear + ';includeSubdomains');
    next();
  });
};
