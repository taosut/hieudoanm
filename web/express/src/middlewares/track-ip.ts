'use strict';

import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

import { ipAPI, utils, telegramClient } from '../libs';

const TELEGRAM_CHAT_ID: number = parseInt(process.env.TELEGRAM_CHAT_ID, 10);

export default async (req: Request, res: Response, next: NextFunction) => {
  const ip: string | string[] = getIP(req);
  const message: string = await getIPmessage(req, ip);
  await telegramClient.sendMarkdownMessage(TELEGRAM_CHAT_ID, message);
  next();
};

const getIPmessage = async (req: Request, ip: string | string[]): Promise<string> => {
  const method: string = _.get(req, 'originalMethod', '');
  const path: string = _.get(req, 'route.path', '');
  const userAgent = _.get(req, 'headers.user-agent', '');
  const browser: string = utils.detectBrowser(userAgent);
  if (!ip) return `\`${method}\` \`${path}\` (\`${browser}\`)`;
  const geolocation = await getGeolocation(ip);
  if (!geolocation) return `\`${method}\` \`${path}\` from **${ip}** (\`${browser}\`)`;
  return `\`${method}\` \`${path}\` from **${ip}** (\`${geolocation}\`) (\`${browser}\`)`;
};

const getGeolocation = async (ip: string | string[]): Promise<string> => {
  if (!ip) return;
  ip = ip.toString();
  const geolocation = await ipAPI.getGeolocation(ip);
  const { status = '', country = '', regionName = '', city = '' } = geolocation;
  if (status !== 'success') return '';
  return `${city} ${regionName} ${country}`.trim();
};

const getIP = (req: Request): string | string[] => {
  if (req.headers) {
    const ip: string | string[] =
      req.header('x-client-ip') ||
      req.header('x-forwarded-for') ||
      req.header('cf-connecting-ip') ||
      req.header('fastly-client-ip') ||
      req.header('true-client-ip') ||
      req.header('x-real-ip') ||
      req.header('x-cluster-client-ip') ||
      req.header('x-forwarded') ||
      req.header('forwarded-for') ||
      req.headers.forwarded;
    return ip;
  }

  if (req.socket && req.socket.remoteAddress) {
    return req.socket.remoteAddress;
  }
};
