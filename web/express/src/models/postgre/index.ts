'use strict';

import { AdministrativeDivisionsDistrict } from './administrative-divisions/district';
import { AdministrativeDivisionsPostalCode } from './administrative-divisions/postal-code';
import { AdministrativeDivisionsProvince } from './administrative-divisions/province';
import { AdministrativeDivisionsWard } from './administrative-divisions/ward';
import { Bank } from './bank';
import { GovernmentMinistry } from './government/ministry';
import { GovernmentOfficial } from './government/official';
import { HistoryDynasty } from './history-dynasty';
import { MusicArtist } from './music-artist';
import { NationalAssemblyMember } from './national-assembly-member';
import { SportsClub } from './sports-club';

export {
  AdministrativeDivisionsDistrict,
  AdministrativeDivisionsPostalCode,
  AdministrativeDivisionsProvince,
  AdministrativeDivisionsWard,
  Bank,
  GovernmentMinistry,
  GovernmentOfficial,
  HistoryDynasty,
  MusicArtist,
  NationalAssemblyMember,
  SportsClub
};

export const AdministrativeDivisionsPostalCodesName: string =
  'administrative_divisions_postal_codes';
export const AdministrativeDivisionsProvincesName: string = 'administrative_divisions_provinces';
export const AdministrativeDivisionsDistrictsName: string = 'administrative_divisions_districts';
export const AdministrativeDivisionsWardsName: string = 'administrative_divisions_wards';
export const BanksName: string = 'banks';
export const GovernmentMinistriesName: string = 'government_ministries';
export const GovernmentOfficialsName: string = 'government_officials';
export const HistoryDynastiesName: string = 'history_dynasties';
export const MusicArtistsName: string = 'music_artists';
export const NationalAssemblyMembersName: string = 'national_assembly_members';
export const SportsClubsName: string = 'sports_clubs';
