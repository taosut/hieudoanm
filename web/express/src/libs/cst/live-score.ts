'use strict';

import _ from 'lodash';
import fetch from 'node-fetch';

import Utils from '../utils/utils';

export default class LiveScore extends Utils {
  public async getVLeague(): Promise<Record<string, any>> {
    const self = this;
    const url: string =
      'https://prod-public-api.livescore.com/v1/api/react/stage/soccer/vietnam/v-league/1.00';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          const stages: Array<Record<string, any>> = _.get(res, 'Stages', []);
          const stage: Record<string, any> = _.get(stages, '0', {});
          const matches: Array<any> = _.get(stage, 'Events', []).map(event => {
            const { year, month, date, hours, minutes, seconds } = self.processDateTime(
              _.get(event, 'Esd', '').toString()
            );
            const mm: string = self.addZero(month);
            const dd: string = self.addZero(date);
            const hh: string = self.addZero(hours);
            const mms: string = self.addZero(minutes);
            const ss: string = self.addZero(seconds);
            const dateTime: string = `${year}/${mm}/${dd} ${hh}:${mms}:${ss}`;
            const round = parseInt(_.get(event, 'Ern', '0'), 10);
            const status = self.processStatus(_.get(event, 'Eps', ''));
            const homeScore = parseInt(_.get(event, 'Tr1OR', '0'), 10);
            const awayScore = parseInt(_.get(event, 'Tr2OR', '0'), 10);
            const homeTeam = _.get(event, 'T1.0.Nm', {})
              .replace(/FC/g, '')
              .replace(/FLC/g, '')
              .trim();
            const awayTeam = _.get(event, 'T2.0.Nm', {})
              .replace(/FC/g, '')
              .replace(/FLC/g, '')
              .trim();
            return {
              round,
              status,
              dateTime,
              homeTeam,
              awayTeam,
              homeScore,
              awayScore,
              year,
              month,
              date,
              hours,
              minutes,
              seconds
            };
          });
          const leagueTable: Array<any> = _.get(stage, 'LeagueTable.L.0.Tables.0.team', []).map(
            team => {
              const rank: number = _.get(team, 'rnk', 0);
              const name: string = _.get(team, 'Tnm', '')
                .replace(/FC/g, '')
                .replace(/FLC/g, '')
                .trim();
              const played: number = _.get(team, 'pld', 0);
              const point: number = _.get(team, 'pts', 0);
              const win: number = _.get(team, 'win', 0);
              const draw: number = _.get(team, 'drw', 0);
              const lost: number = _.get(team, 'lst', 0);
              const goal: number = _.get(team, 'gf', 0);
              const goalAgainst: number = _.get(team, 'ga', 0);
              const goalDifference: number = _.get(team, 'gd', 0);
              return {
                rank,
                name,
                point,
                played,
                win,
                draw,
                lost,
                goal,
                goalAgainst,
                goalDifference
              };
            }
          );
          resolve({ matches, leagueTable });
        })
        .catch((error: Error) => {
          console.error(error);
          resolve({});
        });
    });
  }

  private processStatus(status: string): string {
    if (status === 'FT') return 'COMPLETED';
    if (status === 'NS') return 'SCHEDULED';
    if (status === 'Postp.') return 'POSTPONED';
    return 'LIVE';
  }

  private processDateTime(dateTime: string): Record<string, any> {
    const year = parseInt(dateTime.substring(0, 4), 10);
    const month = parseInt(dateTime.substring(4, 6), 10);
    const date = parseInt(dateTime.substring(6, 8), 10);
    const hours = parseInt(dateTime.substring(8, 10), 10);
    const minutes = parseInt(dateTime.substring(10, 12), 10);
    const seconds = parseInt(dateTime.substring(12, 14), 10);

    return { year, month, date, hours, minutes, seconds };
  }
}
