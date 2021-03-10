import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, UtilsService, NotificationsService } from '../../services';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss']
})
export class ListNotificationsComponent implements OnInit {
  public loading: boolean = false;
  public notifications: Array<any> = [];

  public confirmLoading: boolean = false;

  public button: string = 'btn-primary';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private utilsService: UtilsService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme.button)
      .subscribe((button: string) => {
        this.button = button;
      });
  }

  async ngOnInit(): Promise<void> {
    this.notifications = await this.getNotifications();
  }

  public async getProfile(): Promise<string> {
    const profile = await this.apisService.getProfile();
    const { id } = profile;
    return id;
  }

  public async getNotifications(): Promise<Array<any>> {
    const self = this;
    this.loading = true;
    const notifications = await this.apisService.getNotifications();
    this.loading = false;
    return notifications.map((notification: any) => {
      let { _id, fromId, toId, description, timestamp } = notification;
      const d = new Date(timestamp);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();
      const hour = d.getHours();
      const minute = d.getMinutes();
      const mm: string = self.utilsService.addZero(month);
      const dd: string = self.utilsService.addZero(date);
      const hh: string = self.utilsService.addZero(hour);
      const MM: string = self.utilsService.addZero(minute);
      const dateTime = `${year}/${mm}/${dd} ${hh}:${MM}`;
      status = self.utilsService.capitalize(status);
      return {
        id: _id,
        fromId,
        toId,
        dateTime,
        description
      };
    });
  }

  public async confirmContactRequest(id: string): Promise<void> {
    this.confirmLoading = true;
    const notification = await this.apisService.confirmContactRequest(id);
    this.confirmLoading = false;
    console.log(notification);
    this.notifications = await this.getNotifications();
    this.notificationsService.publish('CONFIRMED!');
  }
}
