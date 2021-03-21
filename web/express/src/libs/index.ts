'use strict';

import { FacebookAuth, GoogleAuth } from './auth';
import { Calendar, CGV, LiveScore, PassportIndex, RESTCountries } from './cst';
import { SSI, TanViet } from './stock';
import { BCrypt, DateTime, JWT, TaskQueueProcessor, Utils, Logger } from './utils';

import {
  CacheClient,
  ElasticSearchClient,
  GitHubClient,
  MongooseClient,
  PostgreClient,
  TelegramClient,
  RedisClient
} from './clients';

import Banks from './banks';
import News from './news';
import Google from './news/google';
import { AirVisual, OpenWeatherMap } from './weather';
import ProPublica from './propublica';
import YouTube from './youtube';
import { RandomUser } from './tests';
import Mailer from './mailer';
import { IPAPI, Socket, Statuses } from './system';

import Vietcetera from 'vietcetera';

export const banks: Banks = new Banks();
export const calendar: Calendar = new Calendar();
export const cgv: CGV = new CGV();
export const dateTime: DateTime = new DateTime();
export const liveScore: LiveScore = new LiveScore();
export const news: News = new News();
export const google: Google = new Google();
export const ssi: SSI = new SSI();
export const tanViet: TanViet = new TanViet();
export const passportIndex: PassportIndex = new PassportIndex();
export const restCountries: RESTCountries = new RESTCountries();
export const randomUser: RandomUser = new RandomUser();
export const logger: Logger = new Logger();
export const ipAPI: IPAPI = new IPAPI();
export const statuses: Statuses = new Statuses();

export { GraphQlService, MongooseService, PostgreService } from './services';

const API_KEY_OPEN_WEATHER: string = process.env.API_KEY_OPEN_WEATHER || '';
export const openWeatherMap: OpenWeatherMap = new OpenWeatherMap(API_KEY_OPEN_WEATHER);

export const taskQueueProcessor: TaskQueueProcessor = new TaskQueueProcessor();
export const utils: Utils = new Utils();

export const vietcetera: Vietcetera = new Vietcetera();

const API_KEY_YOUTUBE: string = process.env.API_KEY_YOUTUBE || '';
export const youTube: YouTube = new YouTube(API_KEY_YOUTUBE);

const API_KEY_AIR_VISUAL: string = process.env.API_KEY_AIR_VISUAL || '';
export const airVisual: AirVisual = new AirVisual(API_KEY_AIR_VISUAL);

const API_KEY_PROPUBLICA: string = process.env.API_KEY_PROPUBLICA || '';
export const proPublica: ProPublica = new ProPublica(API_KEY_PROPUBLICA);

const SECRET_X_TOKEN: string = process.env.SECRET_X_TOKEN || '';
export const jwt: JWT = new JWT(SECRET_X_TOKEN);

const BCRYPT_ROUNDS: number = parseInt(process.env.BCRYPT_ROUNDS || '6', 10) || 6;
export const bcrypt: BCrypt = new BCrypt(BCRYPT_ROUNDS);

const MAILER_EMAIL: string = process.env.MAILER_EMAIL || '';
const MAILER_PASSWORD: string = process.env.MAILER_PASSWORD || '';
export const mailer: Mailer = new Mailer(MAILER_EMAIL, MAILER_PASSWORD);

const URL_BASE = process.env.URL_BASE || 'http://localhost:8080';
export const socket: Socket = new Socket(URL_BASE);

const DB_BONSAI_URL: string = process.env.DB_BONSAI_URL || '';
const DB_MONGO_ATLAS_URL: string = process.env.DB_MONGO_ATLAS_URL || '';
const DB_POSTGRE_USER: string = process.env.DB_POSTGRE_USER || '';
const DB_POSTGRE_PASSWORD: string = process.env.DB_POSTGRE_PASSWORD || '';
const DB_POSTGRE_HOST: string = process.env.DB_POSTGRE_HOST || '';
const DB_POSTGRE_PORT: number = parseInt(process.env.DB_POSTGRE_PORT, 10) || 5432;
const DB_POSTGRE_DATABASE: string = process.env.DB_POSTGRE_DATABASE || '';
const TELEGRAM_API_KEY: string = process.env.TELEGRAM_API_KEY || '';

export { CacheClient };
export const telegramClient: TelegramClient = new TelegramClient(TELEGRAM_API_KEY);
export const mongooseClient: MongooseClient = new MongooseClient(DB_MONGO_ATLAS_URL);
export const esClient: ElasticSearchClient = new ElasticSearchClient(DB_BONSAI_URL);

const postgreConfigs = {
  user: DB_POSTGRE_USER,
  password: DB_POSTGRE_PASSWORD,
  host: DB_POSTGRE_HOST,
  port: DB_POSTGRE_PORT,
  database: DB_POSTGRE_DATABASE
};
export const postgreClient: PostgreClient = new PostgreClient(postgreConfigs);

const REDIS_HOST: string = process.env.REDIS_HOST || '';
const REDIS_PORT: number = parseInt(process.env.REDIS_PORT, 10) || 19035;
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || '';
export const redisClient: RedisClient = new RedisClient(REDIS_HOST, REDIS_PORT, REDIS_PASSWORD);

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_AUTH_REDIRECT: string = process.env.GOOGLE_AUTH_REDIRECT || '';
export const googleAuth: GoogleAuth = new GoogleAuth(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_AUTH_REDIRECT
);

const FACEBOOK_CLIENT_ID: string = process.env.FACEBOOK_CLIENT_ID || '';
const FACEBOOK_CLIENT_SECRET: string = process.env.FACEBOOK_CLIENT_SECRET || '';
const FACEBOOK_AUTH_REDIRECT: string = process.env.FACEBOOK_AUTH_REDIRECT || '';
export const facebookAuth: FacebookAuth = new FacebookAuth(
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_AUTH_REDIRECT
);

const GITHUB_TOKEN: string = process.env.GITHUB_TOKEN || '';
export const gitHubClient: GitHubClient = new GitHubClient(GITHUB_TOKEN);
