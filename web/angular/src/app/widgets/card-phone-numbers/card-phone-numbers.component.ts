import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPlus, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-card-phone-numbers',
  templateUrl: './card-phone-numbers.component.html',
  styleUrls: ['./card-phone-numbers.component.scss']
})
export class CardPhoneNumbersComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;
  public faStar: IconDefinition = faStar;
  public faTrash: IconDefinition = faTrash;

  @Input() primaryPhoneNumber: string = '';
  @Input() phoneNumbers: Array<string> = [];

  public button: string = 'btn-primary';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme.button)
      .subscribe((button: string) => {
        this.button = button;
      });
  }

  ngOnInit(): void {}

  public updatePhoneNumbers(phoneNumbers: Array<string>): void {
    this.phoneNumbers = phoneNumbers;
  }

  public async updatePrimaryPhoneNumber(phoneNumber: string): Promise<void> {
    const user = await this.apisService.updatePrimaryPhoneNumber(phoneNumber);
    const { primaryPhoneNumber, phoneNumbers } = user;
    this.primaryPhoneNumber = primaryPhoneNumber;
    this.phoneNumbers = phoneNumbers;
    this.notificationsService.publish('UPDATED!');
  }

  public async deletePhoneNumber(phoneNumber: string): Promise<void> {
    const user = await this.apisService.deletePhoneNumber(phoneNumber);
    const { phoneNumbers } = user;
    this.phoneNumbers = phoneNumbers;
    this.notificationsService.publish('DELETED!');
  }
}
