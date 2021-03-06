'use strict';

import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

import { numberFormatter, capitalize, convertJSONtoCSV, request } from '../libs';
import {
  open,
  openPersonal,
  operatingSystems,
  cloudProviders,
  cicd,
  hieudoanAPI
} from '../constant';

export const getRepository = async (repo: string): Promise<Record<string, any>> => {
  const url: string = `${hieudoanAPI}/github/repository?repo=${repo}`;
  return await request(url);
};

export const getRepositories = async (list: Array<Record<string, any>>) => {
  const repositories: Array<Record<string, string | number>> = [];
  for (const item of list) {
    const { name = '', repo = '', group = '', step = 0, logo = '' } = item;
    const repository: Record<string, any> = await getRepository(repo);
    const {
      full_name = '',
      language = '',
      forks = 0,
      subscribers_count: subscribers = 0,
      stargazers_count: stars = 0
    } = repository;
    const points: number = forks + subscribers + stars;
    const url: string = `https://github.com/${full_name}`;
    console.log(step, group, name, url, language, stars, subscribers, forks, points);
    repositories.push({
      step,
      group,
      name,
      logo,
      url,
      language,
      stars,
      subscribers,
      forks,
      points
    });
  }
  repositories.sort((a, b) => (a.points < b.points ? 1 : -1));
  return repositories;
};

export const getGroups = (repositories: Array<Record<string, any>>) => {
  const groups: Array<Record<string, any>> = repositories
    .map((repository: Record<string, any>) => repository.group)
    .filter((value: string, index: number, array: Array<string>) => array.indexOf(value) === index)
    .map((group: string) => {
      const { step = 0 } = repositories.find(repository => repository.group === group) || {};
      return { group, step };
    })
    .sort((a, b) => (a.step > b.step ? 1 : -1));
  return groups;
};

export const getRepositoriesByGroups = (
  repositories: Array<Record<string, any>>,
  groups: Array<Record<string, any>>
) => {
  const repositoriesByGroups = groups.map((item: Record<string, any>) => {
    const { group } = item;
    const filterRepositories = repositories
      .filter((repository: Record<string, any>) => repository.group === group)
      .map((repository: Record<string, any>) => {
        delete repository.step;
        delete repository.group;
        delete repository.personal;
        return repository;
      });

    return { group, repositories: filterRepositories };
  });
  return repositoriesByGroups;
};

export const convertArrayToTableMD = (array: Array<Record<string, any>>) => {
  const [first = {}] = array;
  const keys = Object.keys(first).filter((key: string) => key !== 'url');
  const headersText = keys.map(key => capitalize(key.split('_').join(' ')));
  const headers = `| No |${headersText.join(' | ')}|`;
  const dividers = `| --- |${keys.map(() => ' --- ').join(' | ')}|`;
  const rows = array
    .map((repository, index: number) => {
      const cells: string = keys
        .map((key: string) => {
          const value: any = repository[key] || '';
          if (key === 'name') {
            const { url = '' } = repository;
            return `[${value}](${url})`;
          }
          if (key === 'logo') {
            const src: string = `https://raw.githubusercontent.com/vietnamdb/vietnamdb/master/images/techstack/square/${value}.svg`;
            const img: string = `<img src="${src}" alt="${value}" width="36px" height="36px" />`;
            return img;
          }
          if (typeof value === 'number') {
            return numberFormatter(value);
          }
          if (typeof value === 'boolean') {
            return '';
          }
          return value.toLowerCase();
        })
        .join(' | ');
      return `|${index + 1}|${cells}|`;
    })
    .join('\n');
  const table: string = `\n${headers}\n${dividers}\n${rows}`;
  return table;
};

export const buildLanguagesSection = (repositories: Array<Record<string, any>>): string => {
  const allLanguages: Array<string> = repositories
    .map((repository: Record<string, any>) => repository.language)
    .filter((language: string) => language);

  const languages: string = allLanguages
    .filter((value: string, index: number, array: Array<string>) => array.indexOf(value) === index)
    .map((language: string) => {
      const count: number = allLanguages.filter(lan => lan === language).length;
      return { language, count };
    })
    .sort((a, b) => {
      if (a.count === b.count) return a.language > b.language ? 1 : -1;
      return a.count < b.count ? 1 : -1;
    })
    .map((item: Record<string, any>) => {
      const { language, count } = item;
      return `\`${language} (${count})\``;
    })
    .join(', ');

  const section: string = `(Top) Languages: ${languages}`;

  return section;
};

export const buildOperatingSystemsSection = (personalFlag: boolean = false): string => {
  const filterOperatingSystems = operatingSystems
    .filter((os: Record<string, any>) => {
      const { personal = true } = os;
      return personalFlag ? personal : true;
    })
    .map(os => {
      const cloneOS = JSON.parse(JSON.stringify(os));
      delete cloneOS.group;
      delete cloneOS.personal;
      return cloneOS;
    });

  const table: string = convertArrayToTableMD(filterOperatingSystems);
  const section: string = `## Operating Systems\n${table}`;
  return section;
};

export const buildCloudProvidersSection = (personalFlag: boolean = false): string => {
  const filterCloudProviders = cloudProviders
    .filter((provider: Record<string, any>) => {
      const { personal = true } = provider;
      return personalFlag ? personal : true;
    })
    .map(provider => {
      const cloneProvider = JSON.parse(JSON.stringify(provider));
      delete cloneProvider.group;
      delete cloneProvider.personal;
      return cloneProvider;
    });

  const table: string = convertArrayToTableMD(filterCloudProviders);
  const section: string = `## Cloud Providers\n${table}`;
  return section;
};

export const buildCICD = (personalFlag: boolean = false): string => {
  const filterCICD = cicd
    .filter((tool: Record<string, any>) => {
      const { personal = true } = tool;
      return personalFlag ? personal : true;
    })
    .map(tool => {
      const cloneTool = JSON.parse(JSON.stringify(tool));
      delete cloneTool.group;
      delete cloneTool.personal;
      return cloneTool;
    });

  const table: string = convertArrayToTableMD(filterCICD);
  const section: string = `## CI/CD\n${table}`;
  return section;
};

export const writeToMD = async (
  list: Array<Record<string, any>>,
  filename: string,
  h1: string
): Promise<void> => {
  const repositories = await getRepositories(list);
  const groups = getGroups(repositories);
  const repositoriesByGroups = getRepositoriesByGroups(repositories, groups);

  const languagesSection: string = buildLanguagesSection(repositories);

  const tableSections: string = repositoriesByGroups
    .map(item => {
      const { group, repositories = [] } = item;
      const table = convertArrayToTableMD(repositories);
      return `## ${group.toUpperCase()}\n${table}\n`;
    })
    .join('\n');

  const operatingSystemsSection: string = buildOperatingSystemsSection(filename === 'README');
  const cloudProvidersSection: string = buildCloudProvidersSection(filename === 'README');
  const cicdSection: string = buildCICD(filename === 'README');

  const mdPath: string = `../docs/stacks/${filename}.md`;
  const mdData: string = [
    `# ${h1} (${repositories.length})\n`,
    `${languagesSection}\n`,
    `${tableSections}`,
    `${operatingSystemsSection}\n`,
    `${cicdSection}\n`,
    cloudProvidersSection
  ].join('\n');
  await fs.writeFileSync(mdPath, mdData + '\n');
};

export const syncStacks = async (): Promise<void> => {
  // Write to README.md
  await writeToMD(openPersonal, 'README', 'TECHSTACKS');
  console.log('Sync Stacks - README.md');
  // Write to ALL.md
  await writeToMD(open, 'ALL', 'TECHNOLOGIES');
  console.log('Sync Stacks - ALL.md');
};

export const syncLanguages = async (): Promise<void> => {
  const url: string = `${hieudoanAPI}/github/languages`;
  const languages = await request(url);
  const fields: Array<string> = ['language', 'color', 'extensions'];
  const path: string = '../docs/stacks/languages.csv';
  await convertJSONtoCSV(languages, fields, path);
};
