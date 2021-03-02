'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { administrativeDivisions } from '../src/';

describe('administrative divisions', () => {
  it('get marco regions', async () => {
    const marcoRegions: Array<any> = await administrativeDivisions.getMarcoRegions();
    console.log(marcoRegions);
    assert.ok(typeof marcoRegions === 'object' && marcoRegions.length > 0);
  });

  it('get regions', async () => {
    const regions: Array<any> = await administrativeDivisions.getRegions();
    console.log(regions);
    assert.ok(typeof regions === 'object' && regions.length > 0);
  });

  it('get postal codes', async () => {
    const postalCodes: Array<any> = await administrativeDivisions.getPostalCodes();
    console.log(postalCodes);
    assert.ok(typeof postalCodes === 'object' && postalCodes.length > 0);
  });

  it('get provinces', async () => {
    const provinces = await administrativeDivisions.getProvinces();
    console.log(provinces);
    assert.ok(typeof provinces === 'object' && provinces.length > 0);
  });

  it('get districts', async () => {
    const province_id: string = 'ha-noi';
    const districts: Array<any> = await administrativeDivisions.getDistricts(province_id);
    console.log(districts);
    assert.ok(typeof districts === 'object' && districts.length > 0);
  });

  it('get wards', async () => {
    const skip: number = 0;
    const limit: number = 100;
    const wards: Array<any> = await administrativeDivisions.getWards(skip, limit);
    console.log(wards);
    assert.ok(typeof wards === 'object' && wards.length > 0);
  });
});
