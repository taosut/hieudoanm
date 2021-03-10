'use strict';

import { dsGovernmentMinistry, dsGovernmentOfficial, dsNationalAssemblyMember } from '../data';

export default class GovernmentService {
  private officialFields: Array<string> = [
    'title',
    'title_en',
    'title_short',
    'name',
    'gender',
    'gender_en',
    'start_date',
    'end_date'
  ];

  public async getMinistries(level_en: string): Promise<string | Array<any>> {
    const fields: Array<string> = ['short', 'name', 'name_en', 'level', 'level_en'];
    const ministries = await dsGovernmentMinistry.find({ level_en }, fields);
    return ministries;
  }

  private async getOfficials(title_short: string): Promise<Array<Record<string, any>>> {
    const officials: Array<Record<string, any>> = await dsGovernmentOfficial.find(
      { title_short },
      this.officialFields
    );
    return officials;
  }

  public async getMinisters(ministry: string = ''): Promise<Array<Record<string, any>>> {
    return await this.getOfficials(ministry);
  }

  public async getGeneralSecretaries(): Promise<Array<Record<string, any>>> {
    return await this.getOfficials('general-secretary');
  }

  public async getPresidents(): Promise<Array<Record<string, any>>> {
    return await this.getOfficials('president');
  }

  public async getPrimeMinisters(): Promise<Array<Record<string, any>>> {
    return await this.getOfficials('prime-minister');
  }

  public async getNationalAssemblyChairs(): Promise<Array<Record<string, any>>> {
    return await this.getOfficials('national-assembly-chair');
  }

  public async getNationalAssemblyMembers(
    no: number = 14
  ): Promise<string | Array<Record<string, any>>> {
    const members: Array<Record<string, any>> = await dsNationalAssemblyMember.find({ no });
    return members;
  }

  public async getIncumbents(): Promise<string | Array<Record<string, any>>> {
    const { officialFields } = this;
    officialFields.unshift('ranking');
    const officials: Array<Record<string, any>> = await dsGovernmentOfficial.find(
      { end_date: 'incumbent' },
      officialFields
    );
    return officials.sort((a, b) => (a.ranking > b.ranking ? 1 : -1));
  }
}
