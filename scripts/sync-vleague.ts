'use strict';

import { request, convertJSONtoCSV } from './libs';

export const syncVLeague = async () => {
  const url: string = 'https://vietnamdb.herokuapp.com/api/culture/sports/vleague';
  const { matches = [], leagueTable = [] } = await request(url);

  const path: string = '../docs/cst/sports/vleague';

  const matchesFields: Array<string> = ['round', 'status', 'dateTime', 'homeTeam', 'awayTeam', 'homeScore', 'awayScore', 'year', 'month', 'date', 'hours', 'minutes', 'seconds'];
  const matchesPath: string = `${path}/matches.csv`;
  await convertJSONtoCSV(matches, matchesFields, matchesPath);

  const tableFields: Array<string> = ['rank', 'name', 'point', 'played', 'win', 'draw', 'lost', 'goal', 'goalAgainst', 'goalDifference'];
  const tablePath: string = `${path}/table.csv`;
  await convertJSONtoCSV(leagueTable, tableFields, tablePath);
};
