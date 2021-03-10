import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService } from '../../services';

@Component({
  selector: 'app-apps-forex',
  templateUrl: './apps-forex.component.html',
  styleUrls: ['./apps-forex.component.scss']
})
export class AppsForexComponent implements OnInit {
  public loading: boolean = false;

  public bank: string = '';

  public currency: string = '';
  public currencies: Array<string> = [];

  public rates: Array<any> = [];
  public allRates: Array<any> = [];

  public sortBy: string = 'bank';
  public sortDir: number = 1;

  public background: string = '';

  constructor(private apisService: ApisService, private store: Store<AppState>) {
    this.store
      .select(state => state.theme.background)
      .subscribe((background: string) => {
        this.background = background;
      });
  }

  async ngOnInit(): Promise<void> {
    await this.getForexRates();
  }

  public async getForexRates() {
    this.loading = true;
    const allRates = await this.apisService.getForexRates();
    const currencies = allRates
      .map((rate: Record<string, any>) => rate.code)
      .filter((value: string, index: number, array: Array<string>) => {
        return array.indexOf(value) === index;
      })
      .sort();
    const [currency = ''] = currencies;
    this.currency = currency;
    this.currencies = currencies;
    this.allRates = allRates;
    this.rates = allRates.filter((rate: Record<string, any>) => {
      return rate.code === currency;
    });
    this.loading = false;
  }

  public filterRates(): void {
    const { currency, bank, allRates } = this;
    console.log(currency);
    const rates = allRates.filter((rate: Record<string, any>) => {
      const { bank: name, code } = rate;
      const nameFlag = name ? name.toLowerCase().includes(bank.toLowerCase()) : true;
      const codeFlag = code === currency;
      return nameFlag && codeFlag;
    });
    this.rates = rates;
  }

  public sortRates(by: string): void {
    const { rates, sortBy, sortDir } = this;
    const dir: number = sortDir * (by === sortBy ? -1 : 1);
    rates.sort((a, b) => dir * (a[by] > b[by] ? 1 : -1));
    this.sortDir = dir;
    this.sortBy = by;
    this.rates = rates;
  }
}
