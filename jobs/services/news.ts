'use strict';

import fs from 'fs';

import { api } from '../constant';
import { request } from '../libs';

export const syncNews = async (max: number, writeFlag: boolean = false): Promise<Array<any>> => {
  const url: string = `${api}/news/articles?max=${max}`;
  const articles = await request(url, 'GET');
  writeFlag && (await writeFile(articles));
  return articles;
};

const writeFile = async (articles: Array<any> = []): Promise<void> => {
  if (!articles.length) return;
  const list: string = articles
    .map((article: any) => {
      const { title, url, source, sourceURL } = article;
      return `- [${title}](${url}) ([${source}](${sourceURL}))`;
    })
    .join('\n');
  const md: string = `# News

${list}\n`;

  await fs.writeFileSync('../docs/news/README.md', md);
};
