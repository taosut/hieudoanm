'use strict';

import fs from 'fs';
import Vietcetera from 'vietcetera';
import { culture, news, weather, youTube } from 'vnapis';

import { syncNews } from './services/news';
import { addZero, getTime } from './libs';

const vietcetera: Vietcetera = new Vietcetera();
const city: string = 'Hanoi';

const masterRepo: string = `https://github.com/vietnamdb/vietnamdb/tree/master`;

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

export const getLunarCalendar = async (): Promise<Record<string, any>> => {
  console.log('Build README - getLunarCalendar()');
  const { year: solarYear, month: solarMonth, date: solarDate } = getTime();
  const { year: lunarYear, month: lunarMonth, date: lunarDate } = await culture.convertSolarToLunar(
    solarDate,
    solarMonth,
    solarYear
  );
  const canChi = await culture.getCanChi(lunarDate, lunarMonth, lunarYear);
  const tietKhi = await culture.getTietKhi(lunarDate, lunarMonth, lunarYear);
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

export const getWeather = async (city: string): Promise<Record<string, any>> => {
  console.log(`Build README - getWeather(${city})`);
  const { main = {}, weather: _weather = [] } = await weather.getWeather(city);
  const [first = {}] = _weather;
  const { description = 'undefined' } = first;
  const { temp = 0, feels_like: feelsLike = 0 } = main;
  return { description, temp, feelsLike };
};

export const getAirVisual = async (city: string): Promise<number> => {
  console.log(`Build README - getAirVisual(${city})`);
  const { current = [] } = await weather.getAirVisual(city);
  const { pollution = {} } = current;
  const { aqius = 0 } = pollution;
  return aqius;
};

export const getGoogleTrends = async (): Promise<string> => {
  console.log('Build README - getGoogleTrends()');
  const trends: Array<string> = await news.getGoogleTrends();
  if (!trends.length) return '';
  const md: string = trends
    .map((trend: string) => {
      const text = trend.replace(/\(|\)/g, '');
      const encode: string = encodeURI(text);
      const url: string = `https://www.google.com/search?q=${encode}`;
      const src: string = `https://img.shields.io/static/v1?label=${encode}&message=google&color=red&style=flat-square`;
      const img = `![${text}](${src})`;
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
      getAirVisual(city),
      getYouTubeTrending(),
      getYouTubeTrending(10),
      getVietcetera(),
      getLunarCalendar(),
      getNewsArticles(),
      getWeather(city)
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
          currentWeather = {}
        ] = res;
        resolve({
          googleTrends,
          airVisual,
          youTubeTrending,
          musicTrending,
          vietceteraArticles,
          lunarCalendar,
          articles,
          currentWeather
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
    currentWeather = {}
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
  const { description, temp, feelsLike } = currentWeather;
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
