'use strict';

export interface IRoute {
  public: boolean;
  path: string;
  method: string | 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTION';
  tags: Array<string>;
  summary: string;
  description: string;
  request: IRouteRequest;
  middlewares: Array<string>;
  responses: IRouteResponses;
}

export interface IRouteResponses {
  200?: IRouteResponse;
  400?: IRouteResponse;
}

export interface IRouteResponse {
  description: string;
  schema: Record<string, any>;
}

export interface IRouteRequest {
  query: Array<IRouteRequestParameter>;
  body: Array<IRouteRequestParameter>;
}

export interface IRouteRequestParameter {
  name: string;
  description: string;
  type?: 'string' | 'number' | Record<string, any>;
  schema?: Record<string, any>;
  required: boolean;
}

export interface IPostgreConfigs {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

export interface IPostgreResult {
  command: string;
  rowCount: number;
  rows: Array<any>;
  fields: Array<any>;
}

export interface IStockCompany {
  id: string;
  symbol: string;
  market: string;
}

export interface ITanVietOptions {
  year?: number;
  industry?: string;
  period?: string;
  unit?: number;
}

export interface ITelegramMessage {
  chat_id?: string | number;
  text?: string;
  parse_mode?: 'HTML' | 'MarkdownV2' | 'Markdown';
}

export type TelegramMethod = 'GET' | 'POST';

export type TelegramCommand = 'setWebhook' | 'sendMessage' | 'getMe';

export interface IYouTubeVideo {
  id: string;
  channelId: string;
  title: string;
  publishedAt: string;
  description: string;
  channelTitle: string;
  tags: Array<string>;
  categoryId: string;
  url: string;
}

export interface IYouTubeVideoCategory {
  id: string;
  title: string;
  assignable: boolean;
  channelId: string;
}
