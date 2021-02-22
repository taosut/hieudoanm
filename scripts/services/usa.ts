'use strict';

import _ from 'lodash';

import { api } from '../constant';
import { request, convertJSONtoCSV } from '../libs';

const prefix: string = `usa/congress`;

export const syncMembers = async (chamber: string, congress: number): Promise<void> => {
  const url: string = `${api}/${prefix}/members?chamber=${chamber}&congress=${congress}`;
  const members = await request(url, 'GET');
  if (!members.length) return;
  const [member = {}] = members;
  const fields: Array<string> = Object.keys(member);
  const path: string = `../docs/${prefix}/members/${chamber}/${congress}.csv`;
  await convertJSONtoCSV(members, fields, path);
};

export const syncCommittees = async (chamber: string, congress: number): Promise<void> => {
  const url: string = `${api}/${prefix}/committees?chamber=${chamber}&congress=${congress}`;
  const committees = await request(url, 'GET');
  if (!committees.length) return;
  const [committee = {}] = committees;
  const fields: Array<string> = Object.keys(committee);
  const path: string = `../docs/${prefix}/committees/${chamber}/${congress}.csv`;
  await convertJSONtoCSV(committees, fields, path);
};

export const syncUSA = async () => {
  const chambers: Array<string> = ['house', 'senate'];
  const congresses = _.range(80, 118).reverse();
  for (const chamber of chambers) {
    for (const congress of congresses) {
      console.log(`Sync USA - ${chamber} ${congress}`);
      await syncMembers(chamber, congress);
      await syncCommittees(chamber, congress);
    }
  }
};
