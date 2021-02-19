'use strict';

import dotenv from 'dotenv';
dotenv.config();

import GHN from 'giaohangnhanh';
const API_KEY_GIAO_HANG_NHANH: string = process.env.API_KEY_GIAO_HANG_NHANH || '';
const ghn: GHN = new GHN(API_KEY_GIAO_HANG_NHANH, { test: true });

import { convertJSONtoCSV } from './libs';

export const syncProvinces = async (): Promise<Array<any>> => {
  const provinces: Array<any> = await ghn.address.getProvinces();
  const ghnProvincesFields: Array<string> = ['province_id', 'name', 'code'];
  const ghnProvincesPath: string = `../docs/open-apis/ghn/provinces.csv`;
  await convertJSONtoCSV(provinces, ghnProvincesFields, ghnProvincesPath);
  return provinces;
};

export const syncDistricts = async (provinces: Array<any>): Promise<Array<any>> => {
  let districts = await ghn.address.getDistricts(0);
  districts = districts.map((district: Record<string, any>) => {
    const { province_id } = district;
    const province = provinces.find(province => province.province_id === province_id) || {};
    const { name } = province;
    district = Object.assign(district, { province: name });
    return district;
  });

  const ghnDistrictsFields: Array<string> = ['province_id', 'province', 'district_id', 'name', 'code', 'type', 'support_type'];
  const ghnDistrictsPath: string = `../docs/open-apis/ghn/districts.csv`;
  await convertJSONtoCSV(districts, ghnDistrictsFields, ghnDistrictsPath);
  return districts;
};

export const syncWards = async (districts: Array<any>): Promise<Array<any>> => {
  let wards = await ghn.address.getWards(0);
  wards = wards.map((ward: Record<string, any>) => {
    const { district_id } = ward;
    const district = districts.find(district => district.district_id === district_id) || {};
    const { province_id, province, name } = district;
    ward = Object.assign(ward, { province_id, province, district: name });
    return ward;
  });

  const ghnWardsFields: Array<string> = ['province_id', 'province', 'district_id', 'district', 'name', 'code'];
  const ghnWardsPath: string = `../docs/open-apis/ghn/wards.csv`;
  await convertJSONtoCSV(wards, ghnWardsFields, ghnWardsPath);
  return wards;
};

export const syncStations = async (wards: Array<any>): Promise<Array<any>> => {
  const options = { district_id: 0, ward_code: '', offset: 0, limit: 10000 };
  let stations = await ghn.address.getStations(options);
  stations = stations.map((station: Record<string, any>) => {
    const { parent = [] } = station;
    const location: any = {};
    parent.forEach((item: string) => {
      let [key, value = ''] = item.split('/');
      key = key.toLowerCase();
      value = value.toLowerCase();
      location[key] = value;
    });
    const ward =
      wards.find(ward => {
        const { province_id, district_id, code } = ward;
        const { province: _province, district: _district, ward: _ward } = location;
        const provinceFlag: boolean = _province ? province_id === _province : true;
        const districtFlag: boolean = _district ? district_id === _district : true;
        const wardFlag: boolean = _ward ? code === _ward : true;
        return provinceFlag || districtFlag || wardFlag;
      }) || {};
    const { province = '', district = '', name = '' } = ward;
    station = Object.assign(station, { province, district, ward: name });
    return station;
  });

  const ghnStationsFields: Array<string> = ['province', 'district', 'ward', 'id', 'code', 'name', 'address', 'email', 'latitude', 'longitude'];
  const ghnStationsPath: string = `../docs/open-apis/ghn/stations.csv`;
  await convertJSONtoCSV(stations, ghnStationsFields, ghnStationsPath);
  return stations;
};

export const syncGHN = async (): Promise<void> => {
  const provinces: Array<any> = await syncProvinces();
  console.log('Sync Giao Hang Nhanh - Provinces', provinces.length);
  const districts: Array<any> = await syncDistricts(provinces);
  console.log('Sync Giao Hang Nhanh - Districts', districts.length);
  const wards: Array<any> = await syncWards(districts);
  console.log('Sync Giao Hang Nhanh - Wards', wards.length);
  const stations: Array<any> = await syncStations(wards);
  console.log('Sync Giao Hang Nhanh - Stations', stations.length);
};
