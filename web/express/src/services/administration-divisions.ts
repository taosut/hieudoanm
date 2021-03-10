'use strict';

import _ from 'lodash';

import { postgreClient } from '../libs';
import {
  dsAdministrativeDivisionsDistrict,
  dsAdministrativeDivisionsPostalCode,
  dsAdministrativeDivisionsProvince,
  dsAdministrativeDivisionsWard
} from '../data';

export default class AdministrativeDivisionsService {
  public async getMacroRegions(): Promise<Array<string>> {
    const provinces: Array<Record<string, any>> = await dsAdministrativeDivisionsProvince.find();
    const macroRegion: Array<string> = _.uniq(
      provinces.map(province => province.macro_region)
    ).sort();
    return macroRegion;
  }

  public async getRegions(): Promise<Array<string>> {
    const provinces: Array<Record<string, any>> = await dsAdministrativeDivisionsProvince.find();
    const regions: Array<string> = _.uniq(provinces.map(province => province.region)).sort();
    return regions;
  }

  public async getPostalCodes(province_id: string): Promise<Array<any>> {
    const fields: Array<string> = ['code', 'province', 'province_id'];
    const postalCodes: Array<Record<string, any>> = await dsAdministrativeDivisionsPostalCode.find(
      { province_id },
      fields
    );
    return postalCodes;
  }

  public async getProvinces(filter: Record<string, any> = {}): Promise<Array<any>> {
    const fields: Array<string> = [
      'province_id',
      'name',
      'capital',
      'level',
      'level_en',
      'macro_region',
      'macro_region_en',
      'region',
      'region_en'
    ];
    const provinces: Array<Record<string, any>> = await dsAdministrativeDivisionsProvince.find(
      filter,
      fields
    );
    return provinces;
  }

  public async getDistricts(province_id: string): Promise<Array<any>> {
    const fields: Array<string> = ['name', 'level', 'level_en', 'province', 'province_id'];
    const provinces: any = await dsAdministrativeDivisionsDistrict.find({ province_id }, fields);
    return provinces;
  }

  public async getWards(skip: number = 0, limit: number = 100): Promise<Array<any>> {
    const wards: any = await dsAdministrativeDivisionsWard.find({}, { skip, limit });
    return wards;
  }

  public async countWards(): Promise<number> {
    const total: number = await dsAdministrativeDivisionsWard.count({});
    return total;
  }
}
