import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-modal-emails-add',
  templateUrl: './modal-emails-add.component.html',
  styleUrls: ['./modal-emails-add.component.scss']
})
export class ModalEmailsAddComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;

  @Output() onEmailsChanged = new EventEmitter<any>();

  public addEmailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}

  public async addEmail(): Promise<void> {
    const email: string = this.addEmailForm.get('email')?.value;
    const user = await this.apisService.addEmail(email);
    const { emails } = user;
    this.onEmailsChanged.emit(emails);
    this.notificationsService.publish('ADDED!');
  }
}
