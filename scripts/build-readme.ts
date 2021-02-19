'use strict';

import fs from 'fs';

import { request } from './libs';

export const buildREADME = async () => {
  const csv: string = fs.readFileSync('../markdown/csv.md', 'utf-8');
  const npm: string = fs.readFileSync('../markdown/npm.md', 'utf-8');

  const url: string = 'https://vietnamdb.herokuapp.com/api/news/trends';
  const { trends = [] } = await request(url);
  const trendsMD = trends
    .map((trend: string) => {
      const url: string = `https://www.google.com/search?q=${encodeURI(trend)}`;
      return `- [${trend}](${url})`;
    })
    .join('\n');

  const md: string = `# VIETNAMDB

<table style="width:100%"><tbody style="width:100%"><tr><td valign="top" width="33%">

## google trends

${trendsMD}

</td><td valign="top" width="33%">

${csv}
</td><td valign="top" width="33%">

${npm}
</td></tr></tbody></table>
`;

  await fs.writeFileSync('../README.md', md);
};
