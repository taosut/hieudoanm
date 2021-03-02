'use strict';

import { culture } from 'vnapis';

import { convertJSONtoCSV } from '../libs';

export const syncVLeague = async (): Promise<void> => {
  const { matches = [], leagueTable = [] } = await culture.getVLeague();

  const path: string = '../docs/cst/sports/vleague';

  if (matches.length) {
    const matchesFields: Array<string> = [
      'round',
      'status',
      'dateTime',
      'homeTeam',
      'awayTeam',
      'homeScore',
      'awayScore',
      'year',
      'month',
      'date',
      'hours',
      'minutes',
      'seconds'
    ];
    const matchesPath: string = `${path}/matches.csv`;
    await convertJSONtoCSV(matches, matchesFields, matchesPath);
  }

  if (leagueTable.length) {
    const tableFields: Array<string> = [
      'rank',
      'name',
      'point',
      'played',
      'win',
      'draw',
      'lost',
      'goal',
      'goalAgainst',
      'goalDifference'
    ];
    const tablePath: string = `${path}/table.csv`;
    await convertJSONtoCSV(leagueTable, tableFields, tablePath);
  }
};
