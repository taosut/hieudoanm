'use strict';

import fs from 'fs';

import { request } from './libs';

const api: string = 'https://vietnamdb.herokuapp.com/api';
const city: string = 'Hanoi';

export const getWeather = async (): Promise<Record<string, any>> => {
  const url: string = `${api}/weather?city=${city}`;
  const { main = {}, weather = [] } = await request(url);
  const [first = {}] = weather;
  const { description = 'undefined' } = first;
  const { temp = 0, feels_like: feelsLike = 0 } = main;
  return { description, temp, feelsLike };
};

export const getAirVisual = async (): Promise<number> => {
  const url: string = `${api}/weather/air-visual?city=${city}`;
  const { current = [] } = await request(url);
  const { pollution = {} } = current;
  const { aqius = 0 } = pollution;
  return aqius;
};

export const buildGoogleTrends = async (): Promise<string> => {
  const url: string = `${api}/news/trends`;
  const { trends = [] } = await request(url);
  const md: string = trends
    .map((trend: string) => {
      const url: string = `https://www.google.com/search?q=${encodeURI(trend)}`;
      return `- [${trend}](${url})`;
    })
    .join('\n');
  return md;
};

export const buildREADME = async () => {
  const csv: string = fs.readFileSync('../markdown/csv.md', 'utf-8');
  const npm: string = fs.readFileSync('../markdown/npm.md', 'utf-8');
  const googleTrends: string = await buildGoogleTrends();
  const airVisual = await getAirVisual();
  const { description, temp, feelsLike } = await getWeather();

  const md: string = `# VIETNAMDB

\`\`\`txt
The current weather is ${description}.
Temperature is ${temp}°C (feels like ${feelsLike}°C).
Air Visual is ${airVisual}.
\`\`\`

<table style="width:100%"><tbody style="width:100%"><tr><td valign="top" width="33%">

**GOOGLE TRENDS**

${googleTrends}

</td><td valign="top" width="33%">

${csv}
</td><td valign="top" width="33%">

${npm}
</td></tr></tbody></table>
`;

  await fs.writeFileSync('../README.md', md);
};
