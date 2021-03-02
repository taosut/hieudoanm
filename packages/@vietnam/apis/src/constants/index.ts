export const baseURL: string = `https://vietnamdb.herokuapp.com/api`;

export interface IBank {
  id: number;
  code: string;
  name: string;
  name_en: string;
  name_short: string;
  url: string;
  type: string;
  type_en: string;
}

export interface IEthnicMinority {
  name: string;
  type: string;
  type_en: string;
}

export interface IFinanceCompany {
  symbol: string;
  industry: string;
  market: string;
  name: string;
  sector: string;
  subsector: string;
  supersector: string;
  group: string;
  listingDate: string;
}

export interface IGovernmentOfficial {
  ranking: number;
  title: string;
  title_en: string;
  title_short: string;
  name: string;
  gender: string;
  gender_en: string;
  start_date: string;
  end_date: string;
}

export interface IGovernmentMinistry {
  id: number;
  short: string;
  name: string;
  name_en: string;
  level: string;
  level_en: string;
}

export interface ILicensePlate {
  license: string;
  definition: string;
  type: string;
}

export interface IAdministrativeDivisionsPostalCode {
  id: number;
  code: string;
  province: string;
}

export interface IAdministrativeDivisionsProvince {
  id: number;
  name: string;
  capital: string;
  level: string;
  level_en: string;
  macro_region: string;
  macro_region_en: string;
  region: string;
  region_en: string;
}

export interface IAdministrativeDivisionsDistrict {
  id: number;
  name: string;
  level: string;
  level_en: string;
  province: string;
}

export interface IAdministrativeDivisionsWard {
  id: number;
  name: string;
  level: string;
  level_en: string;
  district: string;
  province: string;
}

export interface INationalAssemblyMember {
  id: number;
  no: number;
  name: number;
  gender: string;
  date_of_birth: string;
  city_of_birth: string;
}

export type EnumSportEN = 'basketball' | 'futsal' | 'football';

export interface ISportsClub {
  name: string;
  city: string;
  sport: string;
  sport_en: EnumSportEN;
  competition: string;
}

export interface IPhonesProvider {
  name: string;
  prefixes: Array<string>;
}

export interface IPhonesPrefix {
  prefix: string;
  provider: string;
  provider_id: string;
}

export interface IMusicArtist {
  name: string;
}

export interface INewsArticle {
  title: string;
  publishedDate: string;
  source: string;
  sourceURL: string;
  description: string;
  url: string;
}

export interface IOpenAPI {
  name: string;
  type: string;
  type_en: string;
  url: string;
  npm: string;
}

export interface IVisaRequirement {
  country: string;
  requirement: string;
}
