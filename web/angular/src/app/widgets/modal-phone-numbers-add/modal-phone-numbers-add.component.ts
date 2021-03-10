import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-modal-phone-numbers-add',
  templateUrl: './modal-phone-numbers-add.component.html',
  styleUrls: ['./modal-phone-numbers-add.component.scss']
})
export class ModalPhoneNumbersAddComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;

  @Output() onPhoneNumbersChanged = new EventEmitter<any>();

  public addPhoneNumberForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required])
  });

  constructor(
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}

  public async addPhoneNumber(): Promise<void> {
    const phoneNumber: string = this.addPhoneNumberForm.get('phoneNumber')?.value;
    const user = await this.apisService.addPhoneNumber(phoneNumber);
    const { phoneNumbers = [] } = user;
    this.onPhoneNumbersChanged.emit(phoneNumbers);
    this.notificationsService.publish('ADDED!');
  }
}
