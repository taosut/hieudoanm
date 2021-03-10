import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-modal-addresses-add',
  templateUrl: './modal-addresses-add.component.html',
  styleUrls: ['./modal-addresses-add.component.scss']
})
export class ModalAddressesAddComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;

  @Output() onAddressesChanged = new EventEmitter<any>();

  public addAddressForm: FormGroup = new FormGroup({
    street: new FormControl('', [Validators.required]),
    district: new FormControl(0, [Validators.required]),
    province: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required])
  });

  constructor(
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}

  public async addAddress(): Promise<void> {
    const street: string = this.addAddressForm.get('street')?.value;
    const district: string = this.addAddressForm.get('district')?.value;
    const province: string = this.addAddressForm.get('province')?.value;
    const postalCode: string = this.addAddressForm.get('postalCode')?.value;
    const user = await this.apisService.addAddress({ street, district, province, postalCode });
    const { addresses = [] } = user;
    this.onAddressesChanged.emit(addresses);
    this.notificationsService.publish('ADDED!');
  }
}
