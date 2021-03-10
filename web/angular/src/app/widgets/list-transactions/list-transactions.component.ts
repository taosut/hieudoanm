import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, NotificationsService, UtilsService } from '../../services';

interface ITransaction {
  id: string;
  fromId: string;
  toId: string;
  dateTime: string;
  description: string;
  status: string;
  amount: string;
}

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss']
})
export class ListTransactionsComponent implements OnInit {
  public id: string = '';
  public loading: boolean = false;
  public transactions: Array<ITransaction> = [];

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
    this.id = await this.getProfile();
    this.transactions = await this.getTransactions();
  }

  public async getProfile(): Promise<string> {
    const profile = await this.apisService.getProfile();
    const { id } = profile;
    return id;
  }

  public async getTransactions(): Promise<Array<ITransaction>> {
    const self = this;
    this.loading = true;
    const transactions = await this.apisService.getTransactions();
    this.loading = false;
    return transactions.map((transaction: any) => {
      let {
        _id,
        fromId,
        toId,
        amount,
        description,
        status,
        year,
        month,
        date,
        hour,
        minute
      } = transaction;
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
        amount,
        description,
        status
      };
    });
  }

  public async confirmTransferRequest(id: string): Promise<void> {
    this.confirmLoading = true;
    const transaction = await this.apisService.confirmTransferRequest(id);
    this.confirmLoading = false;
    this.notificationsService.publish('CONFIRMED!');
    console.log(transaction);
  }
}
