'use strict';

import { EnumSportEN, ISportsClub } from '../constants';

import Base from './base';

interface IDate {
  year: number;
  month: number;
  date: number;
}

export default class Culture extends Base {
  private prefix: string = 'culture';

  public isSolarLeapYear(year: number): boolean {
    return year % 4 == 0 || (year % 100 == 0 && year % 400 == 0);
  }

  public isLunarLeapYear(year: number): boolean {
    const list: Array<number> = [0, 3, 6, 9, 11, 14, 17];
    const leap: number = year % 19;
    return list.includes(leap);
  }

  public async convertSolarToLunar(
    date: number,
    month: number,
    year: number,
    timeZone: number = 7
  ): Promise<IDate> {
    return await this.post(`${this.prefix}/calendar/solar2lunar`, { date, month, year, timeZone });
  }

  public async convertLunarToSolar(
    date: number,
    month: number,
    year: number,
    lunarLeap: number = 0,
    timeZone: number = 7
  ): Promise<IDate> {
    const body: Record<string, number> = { date, month, year, lunarLeap, timeZone };
    return await this.post(`${this.prefix}/calendar/lunar2solar`, body);
  }

  public async getListOfCan(): Promise<Array<string>> {
    return await this.get(`${this.prefix}/calendar/lunar/can`);
  }

  public async getListOfChi(): Promise<Array<string>> {
    return await this.get(`${this.prefix}/calendar/lunar/chi`);
  }

  public async getCanChi(date: number, month: number, year: number): Promise<string> {
    const body: Record<string, number> = { date, month, year };
    const { canChi = '' } = await this.post(`${this.prefix}/calendar/lunar/can-chi`, body);
    return canChi;
  }

  public async getTietKhi(date: number, month: number, year: number): Promise<string> {
    const body: Record<string, number> = { date, month, year };
    const { tietKhi } = await this.post(`${this.prefix}/calendar/lunar/tiet-khi`, body);
    return tietKhi;
  }

  private async getClubsBySport(sport: EnumSportEN): Promise<Array<ISportsClub>> {
    const endpoint: string = `${this.prefix}/sports/clubs?sport=${sport}`;
    return await this.get(endpoint);
  }

  public async getBasketballClubs(): Promise<Array<ISportsClub>> {
    return await this.getClubsBySport('basketball');
  }

  public getFootballClubs(): Promise<Array<ISportsClub>> {
    return this.getClubsBySport('football');
  }

  public getFutsalClubs(): Promise<Array<ISportsClub>> {
    return this.getClubsBySport('futsal');
  }
}
