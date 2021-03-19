'use strict';

import fs from 'fs';
import Vietcetera from 'vietcetera';
import { youTube } from 'vnapis';

import { syncNews } from './services/news';
import { addZero } from './libs';

const masterRepo: string = `https://github.com/hieudoanm/hieudoanm/tree/master`;

export const getNewsArticles = async (): Promise<string> => {
  console.log('Build README - getNewsArticles()');
  const articles = await syncNews(10, false);
  if (!articles.length) return '';
  return articles
    .map((article: any) => {
      const { title, url, source, sourceURL } = article;
      return `- [${title}](${url}) ([${source}](${sourceURL}))`;
    })
    .join('\n');
};

export const getYouTubeTrending = async (categoryId: number = 0): Promise<string> => {
  console.log(`Build README - getYouTubeTrending(${categoryId})`);
  const videos = await youTube.getTrending(categoryId);
  const top10 = videos.slice(0, 10);
  return top10
    .map((video: Record<string, any>, index: number) => {
      const { title, url, channelId, channelTitle } = video;
      const channelUrl: string = `https://www.youtube.com/channel/${channelId}`;
      return `${addZero(index + 1)}. [${title}](${url}) - [${channelTitle}](${channelUrl})`;
    })
    .join('\n');
};

export const buildNPM = (): string => {
  const packages: Array<string> = [
    'giaohangnhanh',
    'onepay',
    'vietcetera',
    'vietnambanks',
    'vietnamgovernment',
    'vietnamnews',
    'vnapis',
    'vnpay',
    'vtcpay',
    'zalopay'
  ].sort();
  return packages
    .map((_package: string) => {
      const src: string = `https://img.shields.io/npm/dm/${_package}.svg?style=flat-square&label=${_package}&color=red`;
      const url: string = `https://www.npmjs.com/package/${_package}`;
      return `- [![download](${src})](${url})`;
    })
    .join('\n');
};

const getAll = (): Promise<Record<string, any>> => {
  return new Promise(resolve => {
    Promise.all([getYouTubeTrending(), getYouTubeTrending(10), getNewsArticles()])
      .then(res => {
        const [youTubeTrending = '', musicTrending = '', articles = ''] = res;
        resolve({ youTubeTrending, musicTrending, articles });
      })
      .catch(error => {
        console.error('error', error);
        resolve({});
      });
  });
};

export const buildREADME = async () => {
  console.time('GET ALL');
  const { youTubeTrending = '', musicTrending = '', articles = '' } = await getAll();
  console.timeEnd('GET ALL');
  const npm: string = buildNPM();

  const avatar: string = `https://raw.githubusercontent.com/hieudoanm/hieudoanm/master/images/hieudoanm/profile.jpg`;

  const md: string = `<p align="center"><img src="${avatar}" alt="VIETNAM" height="60"/></p>
<h1 align="center">HIEU</h1>
<p align="center">VIETNAM 🇻🇳 RESTful APIs.</p>
<p align="center">
  <a href="https://vietnamdb.herokuapp.com/api">APIs</a> -
  <a href="https://vietnamdb.herokuapp.com/docs">Docs</a> -
  <a href="${masterRepo}/docs">CSV</a> -
  <a href="${masterRepo}/docs/stacks">Stacks</a>
</p>
<p align="center"> 
  Visitor count<br><br>
  <img src="https://profile-counter.glitch.me/vietnamdb/count.svg" />
</p>


<h2 align="center">NOW</h2>

<table style="width:100%"><tbody style="width:100%"><tr><td valign="top" width="33%">

**NPM**

${npm}

</td><td valign="top" width="33%">

**NEWS**

${articles}

[Read More](docs/news/README.md)

</td><td valign="top" width="33%">

**MUSIC TRENDS**

${musicTrending}

[Read More](https://www.youtube.com/feed/trending?bp=4gIuCggvbS8wNHJsZhIiUExGZ3F1TG5MNTlhbW42X05FZFc5TGswZDdXZWVST0Q2VA%3D%3D)

</td></tr></tbody></table>

<h2 align="center">TODAY</h2>

<table style="width:100%"><tbody style="width:100%"><tr><td valign="top" width="33%">

**YOUTUBE TRENDS**

${youTubeTrending}

[Read More](https://www.youtube.com/feed/trending)

</td><td valign="top" width="33%">

</td><td valign="top" width="33%">

</td></tr></tbody></table>
`;

  await fs.writeFileSync('../README.md', md);
};
