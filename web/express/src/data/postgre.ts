'use strict';

import { PostgreService } from '../libs';

import {
  AdministrativeDivisionsDistrictsName,
  AdministrativeDivisionsPostalCodesName,
  AdministrativeDivisionsProvincesName,
  AdministrativeDivisionsWardsName,
  BanksName,
  GovernmentMinistriesName,
  GovernmentOfficialsName,
  HistoryDynastiesName,
  MusicArtistsName,
  NationalAssemblyMembersName,
  SportsClubsName
} from '../models';

export const dsAdministrativeDivisionsDistrict: PostgreService = new PostgreService(
  AdministrativeDivisionsDistrictsName
);
export const dsAdministrativeDivisionsPostalCode: PostgreService = new PostgreService(
  AdministrativeDivisionsPostalCodesName
);
export const dsAdministrativeDivisionsProvince: PostgreService = new PostgreService(
  AdministrativeDivisionsProvincesName
);
export const dsAdministrativeDivisionsWard: PostgreService = new PostgreService(
  AdministrativeDivisionsWardsName
);
export const dsBank: PostgreService = new PostgreService(BanksName);
export const dsGovernmentMinistry: PostgreService = new PostgreService(GovernmentMinistriesName);
export const dsGovernmentOfficial: PostgreService = new PostgreService(GovernmentOfficialsName);
export const dsHistoryDynasty: PostgreService = new PostgreService(HistoryDynastiesName);

export const dsMusicArtist: PostgreService = new PostgreService(MusicArtistsName);
export const dsNationalAssemblyMember: PostgreService = new PostgreService(
  NationalAssemblyMembersName
);
export const dsSportsClub: PostgreService = new PostgreService(SportsClubsName);
