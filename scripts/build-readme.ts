'use strict';

import fs from 'fs';
import Vietcetera from 'vietcetera';

import { api } from './constant';
import { syncNews } from './services/news';
import { addZero, request, getTime } from './libs';

const vietcetera: Vietcetera = new Vietcetera();
const city: string = 'Hanoi';

const masterRepo: string = `https://github.com/vietnamdb/vietnamdb/tree/master`;

export const getNewsArticles = async (): Promise<string> => {
  console.log('Build README - getNewsArticles()');
  const articles = await syncNews(10, false);
  return articles
    .map((article: any) => {
      const { title, url, source, sourceURL } = article;
      return `- [${title}](${url}) ([${source}](${sourceURL}))`;
    })
    .join('\n');
};

export const getLunarCalendar = async (): Promise<Record<string, any>> => {
  console.log('Build README - getLunarCalendar()');
  const url: string = `${api}/culture/calendar/solar2lunar`;
  const { year: solarYear, month: solarMonth, date: solarDate } = getTime();
  const { year: lunarYear, month: lunarMonth, date: lunarDate } = await request(url, 'POST', {
    year: solarYear,
    month: solarMonth,
    date: solarDate
  });
  const canChiURL: string = `${api}/culture/calendar/lunar/can-chi`;
  const { canChi } = await await request(canChiURL, 'POST', {
    year: lunarYear,
    month: lunarMonth,
    date: lunarDate
  });
  const tietKhiURL: string = `${api}/culture/calendar/lunar/tiet-khi`;
  const { tietKhi } = await await request(tietKhiURL, 'POST', {
    year: lunarYear,
    month: lunarMonth,
    date: lunarDate
  });
  return { solarYear, solarMonth, solarDate, lunarYear, lunarMonth, lunarDate, canChi, tietKhi };
};

export const getVietcetera = async (): Promise<string> => {
  console.log('Build README - getVietcetera()');
  const type: any = 'latest';
  const basicArticles: Array<Record<string, any>> = await vietcetera.getArticles({ type });
  const articles = basicArticles
    .map((article: Record<string, any> = {}) => {
      const { title = '', slug = '', language = '' } = article;
      const url =
        language && slug ? `https://vietcetera.com/${language.toLowerCase()}/${slug}` : '';
      return `- [${title}](${url})`;
    })
    .join('\n');
  return articles;
};

export const getYouTubeTrending = async (categoryId: number = 0): Promise<string> => {
  console.log(`Build README - getYouTubeTrending(${categoryId})`);
  const link: string = `${api}/youtube/trending`;
  const url: string = categoryId ? `${link}?categoryId=${categoryId}` : link;
  const videos = await request(url);
  const top10 = videos.slice(0, 10);
  return top10
    .map((video: Record<string, any>, index: number) => {
      const { title, url, channelId, channelTitle } = video;
      const channelUrl: string = `https://www.youtube.com/channel/${channelId}`;
      return `${addZero(index + 1)}. [${title}](${url}) - [${channelTitle}](${channelUrl})`;
    })
    .join('\n');
};

export const getWeather = async (): Promise<Record<string, any>> => {
  console.log('Build README - getWeather()');
  const url: string = `${api}/weather?city=${city}`;
  const { main = {}, weather = [] } = await request(url);
  const [first = {}] = weather;
  const { description = 'undefined' } = first;
  const { temp = 0, feels_like: feelsLike = 0 } = main;
  return { description, temp, feelsLike };
};

export const getAirVisual = async (): Promise<number> => {
  console.log('Build README - getAirVisual()');
  const url: string = `${api}/weather/air-visual?city=${city}`;
  const { current = [] } = await request(url);
  const { pollution = {} } = current;
  const { aqius = 0 } = pollution;
  return aqius;
};

export const getGoogleTrends = async (): Promise<string> => {
  console.log('Build README - getGoogleTrends()');
  const url: string = `${api}/news/trends`;
  const { trends = [] } = await request(url);
  const md: string = trends
    .map((trend: string) => {
      const encode: string = encodeURI(trend);
      const url: string = `https://www.google.com/search?q=${encode}`;
      const src: string = `https://img.shields.io/static/v1?label=${encode}&message=google&color=red&style=flat-square`;
      const img = `![${trend}](${src})`;
      return `- [${img}](${url})`;
    })
    .join('\n');
  return md;
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
    Promise.all([
      getGoogleTrends(),
      getAirVisual(),
      getYouTubeTrending(),
      getYouTubeTrending(10),
      getVietcetera(),
      getLunarCalendar(),
      getNewsArticles(),
      getWeather()
    ])
      .then(res => {
        const [
          googleTrends = '',
          airVisual = 0,
          youTubeTrending = '',
          musicTrending = '',
          vietceteraArticles = '',
          lunarCalendar = {},
          articles = '',
          weather = {}
        ] = res;
        resolve({
          googleTrends,
          airVisual,
          youTubeTrending,
          musicTrending,
          vietceteraArticles,
          lunarCalendar,
          articles,
          weather
        });
      })
      .catch(error => {
        console.error('error', error);
        resolve({});
      });
  });
};

export const buildREADME = async () => {
  console.time('GET ALL');
  const {
    googleTrends = '',
    airVisual = 0,
    youTubeTrending = '',
    musicTrending = '',
    vietceteraArticles = '',
    lunarCalendar = {},
    articles = '',
    weather = {}
  } = await getAll();
  console.timeEnd('GET ALL');
  const {
    solarYear = 0,
    solarMonth = 0,
    solarDate = 0,
    lunarYear = 0,
    lunarMonth = 0,
    lunarDate = 0,
    canChi = '',
    tietKhi = ''
  } = lunarCalendar;
  const { description, temp, feelsLike } = weather;
  const npm: string = buildNPM();

  const md: string = `<p align="center"><img src="https://raw.githubusercontent.com/vietnamdb/vietnamdb/master/images/top.png" alt="VIETNAM" height="60"/></p>
<h1 align="center">VIETNAMDB</h1>
<p align="center">VIETNAM 🇻🇳 RESTful APIs.</p>
<p align="center">
  <a href="https://vietnamdb.herokuapp.com/api">APIs</a> -
  <a href="https://vietnamdb.github.io/#/">Docs</a> -
  <a href="${masterRepo}/docs">CSV</a> -
  <a href="${masterRepo}/docs/stacks">Stacks</a>
</p>
<p align="center"> 
  Visitor count<br><br>
  <img src="https://profile-counter.glitch.me/vietnamdb/count.svg" />
</p>


<h2 align="center">NOW</h2>

<table style="width:100%"><tbody style="width:100%"><tr><td valign="top" width="33%">

**CALENDAR**

- Current weather is ${description}.
- Temperature is ${temp}°C.
- Feels Like ${feelsLike}°C.
- Air Visual is ${airVisual}.

**WEATHER**

- Date: ${solarYear}/${addZero(solarMonth)}/${addZero(solarDate)}
- Lunar: ${lunarYear}/${addZero(lunarMonth)}/${addZero(lunarDate)}
- Tiet Khi: ${tietKhi}.
- ${canChi}.

**NPM**

${npm}

</td><td valign="top" width="33%">

**GOOGLE TRENDS**

${googleTrends}

[Read More](https://trends.google.com/trends/?geo=VN)

</td><td valign="top" width="33%">

**NEWS**

${articles}

[Read More](docs/news/README.md)

</td></tr></tbody></table>

<h2 align="center">TODAY</h2>

<table style="width:100%"><tbody style="width:100%"><tr><td valign="top" width="33%">

**VIETCETERA**

${vietceteraArticles}

[Read More](https://vietcetera.com/)

</td><td valign="top" width="33%">

**MUSIC TRENDS**

${musicTrending}

[Read More](https://www.youtube.com/feed/trending?bp=4gIuCggvbS8wNHJsZhIiUExGZ3F1TG5MNTlhbW42X05FZFc5TGswZDdXZWVST0Q2VA%3D%3D)

</td><td valign="top" width="33%">

**YOUTUBE TRENDS**

${youTubeTrending}

[Read More](https://www.youtube.com/feed/trending)

</td></tr></tbody></table>
`;

  await fs.writeFileSync('../README.md', md);
};
