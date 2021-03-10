import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, UtilsService } from '../../services';

@Component({
  selector: 'app-card-balance',
  templateUrl: './card-balance.component.html',
  styleUrls: ['./card-balance.component.scss']
})
export class CardBalanceComponent implements OnInit {
  @Input() balance: string = '0';
  public loading: boolean = false;

  public textColor: string = '';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private utilsService: UtilsService
  ) {
    this.store
      .select(state => state.theme.textColor)
      .subscribe((textColor: string) => {
        this.textColor = textColor;
      });
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.balance = await this.getBalance();
    this.loading = false;
  }

  public async getBalance(): Promise<string> {
    const { balance = 0 } = await this.apisService.getBalance();
    return balance;
  }
}
