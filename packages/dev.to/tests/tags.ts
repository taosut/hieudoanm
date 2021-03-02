'use strict';

import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

import DevTo from '../src/index';

const { DEV_TO_API_KEY } = process.env;

const main = async () => {
  const devTo = new DevTo(DEV_TO_API_KEY);

  let i = 1;
  let emptyFlag = false;
  let allTags = [];
  while (!emptyFlag) {
    const tagsPerPage = await devTo.getTags(i);
    allTags = allTags.concat(tagsPerPage);
    emptyFlag = tagsPerPage.length === 0;
    console.log(i, tagsPerPage.length);
    i++;
  }

  const ids = allTags
    .filter(tag => tag.bg_color_hex)
    .map(tag => tag.id)
    .filter((value, index, array) => array.indexOf(value) === index);

  const tags = ids.map(id => allTags.find(tag => tag.id === id)).sort((a, b) => (a.name > b.name ? 1 : -1));

  const jsonData = JSON.stringify(tags, null, 2);
  await fs.writeFileSync('./tests/tags.json', jsonData);

  const headers = tags
    .map(tag => {
      const { name } = tag;
      return name[0];
    })
    .filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

  const mdData =
    `# Tags\n\n` +
    headers
      .map(header => {
        const list = tags
          .filter(tag => {
            const { name } = tag;
            const first = name[0];
            console.log(header, first);
            return header === first;
          })
          .map(tag => {
            const { name } = tag;
            const devToLink = `https://dev.to/t/${name}`;
            const googleLink = `https://google.com/search?q=${name}`;
            return `- [${name}](${devToLink}) ([Google](${googleLink}))`;
          });

        return `## ${header.toUpperCase()} (${list.length})\n\n${list.join('\n')}\n`;
      })
      .join('\n');
  console.log(mdData);
  await fs.writeFileSync('./tests/tags.md', mdData);
};

main().catch(error => console.error(error.stack));
