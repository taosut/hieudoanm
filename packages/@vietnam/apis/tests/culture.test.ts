'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { culture } from '../src/';

describe('culture', () => {
  it('convert solar to lunar', async () => {
    const { date, month, year } = await culture.convertSolarToLunar(8, 8, 2020);
    console.log(date, month, year);
    assert.ok(date === 19 && month === 6 && year === 2020);
  });

  it('convert lunar to solar', async () => {
    const { date, month, year } = await culture.convertLunarToSolar(19, 6, 2020);
    console.log(date, month, year);
    assert.ok(date === 8 && month === 8 && year === 2020);
  });

  it('get list of can', async () => {
    const listOfCan = await culture.getListOfCan();
    console.log(listOfCan);
    assert.ok(typeof listOfCan === 'object' && listOfCan.length > 0);
  });

  it('get list of chi', async () => {
    const listOfChi = await culture.getListOfChi();
    console.log(listOfChi);
    assert.ok(typeof listOfChi === 'object' && listOfChi.length > 0);
  });

  it('get can chi', async () => {
    const canChi = await culture.getCanChi(19, 6, 2020);
    console.log(canChi);
    assert.ok(canChi === 'năm canh tý tháng tân tỵ ngày quý hợi');
  });

  it('get tiet khi', async () => {
    const tietKhi = await culture.getTietKhi(19, 6, 2020);
    console.log(tietKhi);
    assert.ok(tietKhi === 'Cốc vũ');
  });

  it('is solar leap year', async () => {
    const isSolarLeapYear = culture.isSolarLeapYear(2020);
    assert.ok(isSolarLeapYear);
  });

  it('is lunar leap year', async () => {
    const isLunarLeapYear = culture.isLunarLeapYear(2020);
    assert.ok(isLunarLeapYear);
  });

  it('get basketball clubs', async () => {
    const basketballClubs = await culture.getBasketballClubs();
    console.log(basketballClubs);
    assert.ok(typeof basketballClubs === 'object' && basketballClubs.length > 0);
  });

  it('get football clubs', async () => {
    const footballClubs = await culture.getFootballClubs();
    console.log(footballClubs);
    assert.ok(typeof footballClubs === 'object' && footballClubs.length > 0);
  });

  it('get futsal clubs', async () => {
    const futsalClubs = await culture.getFutsalClubs();
    console.log(futsalClubs);
    assert.ok(typeof futsalClubs === 'object' && futsalClubs.length > 0);
  });

  it('get vleague', async () => {
    const vLeague = await culture.getVLeague();
    console.log(vLeague);
    assert.ok(typeof vLeague === 'object');
  });
});
