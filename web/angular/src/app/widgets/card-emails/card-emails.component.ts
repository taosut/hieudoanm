import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPlus, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { authenticate } from '../../store/actions';
import { ApisService, StorageService, NotificationsService } from '../../services';

@Component({
  selector: 'app-card-emails',
  templateUrl: './card-emails.component.html',
  styleUrls: ['./card-emails.component.scss']
})
export class CardEmailsComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;
  public faStar: IconDefinition = faStar;
  public faTrash: IconDefinition = faTrash;

  @Input() primaryEmail: string = '';
  @Input() emails: Array<string> = [];

  public button: string = 'btn-primary';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private storageService: StorageService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme.button)
      .subscribe((button: string) => {
        this.button = button;
      });
  }

  ngOnInit(): void {}

  public updateEmails(emails: Array<string>): void {
    this.emails = emails;
  }

  public async updatePrimaryEmail(email: string): Promise<void> {
    const response = await this.apisService.updatePrimaryEmail(email);
    const { user, token } = response;
    const { primaryEmail, emails } = user;
    this.primaryEmail = primaryEmail;
    this.emails = emails;
    this.setAuthentication(token);
    this.notificationsService.publish('UPDATED!');
  }

  private setAuthentication(token: string) {
    this.storageService.setCookie('token', token);
    this.store.dispatch(authenticate({ token, isAuthenticated: true }));
  }

  public async deleteEmail(email: string): Promise<void> {
    const user = await this.apisService.deleteEmail(email);
    const { emails } = user;
    this.emails = emails;
    this.notificationsService.publish('DELETED!');
  }
}
