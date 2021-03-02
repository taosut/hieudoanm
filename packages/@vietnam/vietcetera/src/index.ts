'use strict';

import fetch from 'node-fetch';

type TypeEnum = 'latest' | 'popular' | 'editor-pick' | 'recommend-popular';
type LanguageEnum = 'VN' | 'EN';

interface ArticleOptions {
  type?: TypeEnum;
  language?: LanguageEnum;
  page?: number;
  limit?: number;
}

interface Image {
  featureImage: string;
  featureImageCaption: string;
  height: number;
  width: number;
  url: string;
}

interface Topic {
  _id: string;
  tags: Array<string>;
  name: string;
  key: string;
  language: string;
}

interface Article {
  _id: string;
  language: LanguageEnum;
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  topic: Array<Topic>;
  images: Image;
}

export default class Vietcetera {
  private base: string = 'https://api.vietcetera.com/client/api';

  public async getFavoristTopics(language: LanguageEnum = 'VN'): Promise<Array<Topic>> {
    const { base } = this;
    const url: string = `${base}/user-favorist-topic/get-favorist-topic?language=${language}`;
    const { errorCode, data = [] } = await fetch(url).then(res => res.json());
    return errorCode === 200 ? data : [];
  }

  public async getArticles(options: ArticleOptions = {}): Promise<Array<any>> {
    const { base } = this;
    const { type = 'latest', language = 'VN', page = 1, limit = 10 } = options;
    const languageOnlyTypes: Array<string> = ['editor-pick', 'recommend-popular'];
    const queryParameters: string = languageOnlyTypes.includes(type)
      ? this.convertQueryParamsToString({ language })
      : this.convertQueryParamsToString({ language, page, limit });
    const url: string = `${base}/v2/${type}-article?${queryParameters}`;
    const { errorCode, data = {} } = await fetch(url).then(res => res.json());
    const { docs = [] } = data;
    return errorCode === 200 ? docs : [];
  }

  public async getLatestArticles(options: ArticleOptions = {}): Promise<Array<any>> {
    const { language = 'VN', page = 1, limit = 10 } = options;
    return await this.getArticles({ type: 'latest', language, page, limit });
  }

  public async getPopularArticles(options: ArticleOptions = {}): Promise<Array<any>> {
    const { language = 'VN', page = 1, limit = 10 } = options;
    return await this.getArticles({ type: 'popular', language, page, limit });
  }

  public async getEditorPickArticles(language: LanguageEnum = 'VN'): Promise<Array<any>> {
    return await this.getArticles({ type: 'editor-pick', language });
  }

  private convertQueryParamsToString(queryParameters: Object = {}): string {
    const keys: Array<string> = Object.keys(queryParameters);
    return keys.map((key: string) => `${key}=${queryParameters[key] || ''}`).join('&');
  }
}
