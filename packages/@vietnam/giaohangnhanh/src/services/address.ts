'use strict';

import Base from '../helper/base';
import {
  apis,
  IEndpoint,
  IResponse,
  IProvince,
  IDistrict,
  IWard,
  IStationRequest,
  IStation
} from '../helper/constants';

export default class Address extends Base {
  constructor(token: string, test: boolean) {
    super(token, test);
  }

  public async getProvinces(): Promise<Array<IProvince> | any> {
    const endpoint: IEndpoint = apis.address.getProvinces;
    const response: IResponse = await this.fetch(endpoint);
    let { code = 0, message = '', data = [] } = response;
    if (code !== 200) return { message };
    data = data || [];
    const provinces = data.map(item => {
      const { ProvinceID: province_id, ProvinceName: name, Code: code } = item;
      return { province_id, name, code };
    });
    return provinces;
  }

  public async getDistricts(province_id: number): Promise<Array<IDistrict> | any> {
    const endpoint: IEndpoint = apis.address.getDistricts;
    const response: IResponse = await this.fetch(endpoint, { query: { province_id } });
    let { code = 0, message = '', data = [] } = response;
    if (code !== 200) return { message };
    data = data || [];
    const districts = data.map(item => {
      const {
        DistrictID: district_id,
        ProvinceID: province_id,
        DistrictName: name,
        Code: code,
        Type: type,
        SupportType: support_type
      } = item;
      return { district_id, province_id, name, code, type, support_type };
    });
    return districts;
  }

  public async getWards(district_id: number): Promise<Array<IWard> | any> {
    const endpoint: IEndpoint = apis.address.getWards;
    const response: IResponse = await this.fetch(endpoint, { query: { district_id } });
    let { code = 0, message = '', data = [] } = response;
    if (code !== 200) return { message };
    data = data || [];
    const wards = data.map(item => {
      const { DistrictID: district_id, WardName: name, WardCode: code } = item;
      return { district_id, name, code };
    });
    return wards;
  }

  public async getStations(options: IStationRequest): Promise<Array<IStation> | any> {
    const endpoint: IEndpoint = apis.address.getStations;
    const { district_id = 0, ward_code = '', offset = 0, limit = 1000 } = options;
    const query = { district_id, ward_code, offset, limit };
    const response: IResponse = await this.fetch(endpoint, { query });
    let { code = 0, message = '', data = [] } = response;
    if (code !== 200 || data === null) return { message };
    data = data || [];
    const stations = data.map(item => {
      const {
        address,
        locationCode: code,
        locationId: id,
        locationName: name,
        parentLocation: parent,
        email,
        latitude,
        longitude
      } = item;
      return { address, code, id, name, parent, email, latitude, longitude };
    });
    return stations;
  }
}
