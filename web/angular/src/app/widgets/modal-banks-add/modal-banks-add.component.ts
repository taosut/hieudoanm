import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-modal-banks-add',
  templateUrl: './modal-banks-add.component.html',
  styleUrls: ['./modal-banks-add.component.scss']
})
export class ModalBanksAddComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;

  @Output() onBanksChanged = new EventEmitter<any>();

  public addBankForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required])
  });

  public banks: Array<any> = [];

  constructor(
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.banks = await this.getAllBanks();
  }

  public async addBank(): Promise<void> {
    const { banks: allBanks = [] } = this;
    const code: string = this.addBankForm.get('code')?.value;
    const number: string = this.addBankForm.get('number')?.value;
    const [{ name = '' }] = allBanks.filter(bank => bank.code === code);
    const user = await this.apisService.addBank({ code, name, number });
    const { banks = [] } = user;
    this.onBanksChanged.emit(banks);
    this.notificationsService.publish('ADDED!');
  }

  public async getAllBanks(): Promise<Array<any>> {
    const banks = await this.apisService.getAllBanks();
    return banks;
  }
}
