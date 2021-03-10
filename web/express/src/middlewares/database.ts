'use strict';

import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { mongooseClient, postgreClient, redisClient } from '../libs';
import { graphQLSchema } from '../models';

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const URL_BASE: string = process.env.URL_BASE || 'http://localhost:8080';

export default async (app: Application) => {
  await redisClient.connect();
  await mongooseClient.connect();
  await postgreClient.connect();

  const playground: boolean = NODE_ENV === 'development' ? true : false;

  const server: ApolloServer = new ApolloServer({
    schema: graphQLSchema,
    playground,
    introspection: true,
    tracing: true,
    context: async ({ req, res }) => {
      return true;
      // if (env === 'development') return true;
      // const token: string = req.body.token || req.query.token || req.headers['x-access-token'];
      // const decoded = await jwt.verifyToken(token, JwtKeyType.ACCESS);
      // if (utils.isObjectEmpty(decoded))
      //   return res.status(403).send({ message: 'Unauthorized Access' });
      // return decoded;
    }
  });

  // const origin = NODE_ENV === 'development' ? 'http://localhost:8080' : URL_BASE;
  server.applyMiddleware({
    app,
    path: '/graphql',
    // cors: { origin, credentials: true },
    onHealthCheck: () =>
      // eslint-disable-next-line no-undef
      new Promise(async (resolve, reject) => {
        const readyState: number = await mongooseClient.getReadyState();
        if (readyState > 0) {
          resolve(readyState);
        } else {
          reject(readyState);
        }
      })
  });
};
