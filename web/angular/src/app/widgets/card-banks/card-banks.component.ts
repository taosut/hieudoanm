import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

import { ApisService, NotificationsService } from '../../services';

interface IAmount {
  text: string;
  number: number;
}

@Component({
  selector: 'app-card-banks',
  templateUrl: './card-banks.component.html',
  styleUrls: ['./card-banks.component.scss']
})
export class CardBanksComponent implements OnInit {
  public faTrash: IconDefinition = faTrash;

  @Input() banks: Array<any> = [];

  public amounts: Array<IAmount> = [
    { text: '100,000', number: 100000 },
    { text: '200,000', number: 200000 },
    { text: '500,000', number: 500000 },
    { text: '1,000,000', number: 1000000 },
    { text: '2,000,000', number: 2000000 },
    { text: '5,000,000', number: 5000000 }
  ];

  @Output() onBalanceChanged = new EventEmitter<any>();

  public button: string = 'btn-primary';
  public buttonOutline: string = 'btn-outline-primary';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme)
      .subscribe((theme: any) => {
        this.button = theme.button;
        this.buttonOutline = theme.buttonOutline;
      });
  }

  ngOnInit(): void {}

  public async deleteBank(code: string): Promise<void> {
    const user = await this.apisService.deleteBank(code);
    const { banks = [] } = user;
    this.banks = banks;
    this.notificationsService.publish('DELETED!');
  }

  public async topUp(amount: number): Promise<void> {
    const user = await this.apisService.topUp(amount);
    const { balance = 0 } = user;
    this.onBalanceChanged.emit(balance);
    this.notificationsService.publish('TOP UP!');
  }
}
