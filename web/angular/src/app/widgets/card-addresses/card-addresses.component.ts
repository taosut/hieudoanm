import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, NotificationsService } from '../../services';

interface IAddress {
  id: string;
  street: string;
  district: string;
  province: string;
  postalCode: string;
}

@Component({
  selector: 'app-card-addresses',
  templateUrl: './card-addresses.component.html',
  styleUrls: ['./card-addresses.component.scss']
})
export class CardAddressesComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;
  public faTrash: IconDefinition = faTrash;

  @Input() addresses: Array<IAddress> = [];

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

  public updateAddresses(addresses: Array<IAddress>): void {
    this.addresses = addresses;
  }

  public async deleteAddress(id: string): Promise<void> {
    const user = await this.apisService.deleteAddress(id);
    const { addresses = [] } = user;
    this.addresses = addresses;
    this.notificationsService.publish('DELETED!');
  }
}
