import { Component, OnInit } from '@angular/core';

import { ApisService } from '../../services';

@Component({
  selector: 'app-apps-settings',
  templateUrl: './apps-settings.component.html',
  styleUrls: ['./apps-settings.component.scss']
})
export class AppsSettingsComponent implements OnInit {
  public name: string = '';
  public year: number = 0;
  public username: string = '';
  public primaryEmail: string = '';
  public emails: Array<string> = [];
  public primaryPhoneNumber: string = '';
  public phoneNumbers: Array<string> = [];
  public addresses: Array<any> = [];

  public loading: boolean = true;

  constructor(private apisService: ApisService) {}

  async ngOnInit(): Promise<void> {
    await this.getProfile();
  }

  public async getProfile(): Promise<void> {
    this.loading = true;
    const profile = await this.apisService.getProfile();
    this.loading = false;
    const {
      name,
      joinInAt,
      username = '',
      primaryEmail = '',
      emails = [],
      primaryPhoneNumber = '',
      phoneNumbers = [],
      addresses = []
    } = profile;
    const d: Date = new Date(joinInAt);
    this.name = name;
    this.year = d.getFullYear();
    this.primaryEmail = primaryEmail;
    this.emails = emails;
    this.primaryPhoneNumber = primaryPhoneNumber;
    this.phoneNumbers = phoneNumbers;
    this.addresses = addresses;
    this.username = username;
  }
}
