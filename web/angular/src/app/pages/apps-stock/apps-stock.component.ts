import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, UtilsService } from '../../services';

@Component({
  selector: 'app-apps-stock',
  templateUrl: './apps-stock.component.html',
  styleUrls: ['./apps-stock.component.scss']
})
export class AppsStockComponent implements OnInit {
  public chartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Default', fill: false }
  ];
  public chartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  public chartOptions: ChartOptions = {
    responsive: true
  };

  public chartColors: Color[] = [{ borderColor: '#007bff' }];
  public chartPlugins: Array<any> = [];

  public symbol: string = 'VIC';
  public companies: Array<any> = [];

  public period: string = '1M';
  public periods: Array<any> = [
    { label: '1 Week', value: '1W' },
    { label: '2 Weeks', value: '2W' },
    { label: '3 Weeks', value: '3W' },
    { label: '1 Month', value: '1M' },
    { label: '2 Months', value: '2M' },
    { label: '3 Months', value: '3M' },
    { label: '6 Months', value: '6M' },
    { label: '1 Year', value: '1Y' },
    { label: '2 Years', value: '2Y' },
    { label: '3 Years', value: '3Y' },
    { label: '4 Years', value: '4Y' },
    { label: '5 Years', value: '5Y' }
  ];

  public loading: boolean = true;

  constructor(
    private apisService: ApisService,
    private utilsService: UtilsService,
    private store: Store<AppState>
  ) {
    this.store
      .select(state => state.theme.lineChartColor)
      .subscribe((lineChartColor: string) => {
        this.chartColors = [{ borderColor: lineChartColor }];
      });
  }

  async ngOnInit(): Promise<void> {
    await this.getStockCompanies();
    await this.getStockHistory();
  }

  public async getStockCompanies() {
    const companies = await this.apisService.getStockCompanies();
    this.companies = companies;
  }

  public async getStockHistory() {
    const self = this;
    this.loading = true;
    const { symbol = 'VIC', period = '1M' } = this;
    const { from, to } = this.processPeriod(period);
    const items = await this.apisService.getStockHistory(symbol, from, to);
    const [item = {}] = items;
    const { history = [] } = item;
    history.sort((a: any, b: any) => a.timestamp - b.timestamp);
    const closeData = history.map((item: any) => item.close);
    const labels = history.map((item: any) => {
      const { year, month, date } = item;
      const mm: string = self.utilsService.addZero(month);
      const dd: string = self.utilsService.addZero(date);
      return `${year}/${mm}/${dd}`;
    });
    this.chartData = [{ data: closeData, label: `${symbol} (Close)`, fill: false }];
    this.chartLabels = labels;
    this.loading = false;
  }

  public processPeriod(period: string): any {
    const now = Date.now();
    const oneDay = 1000 * 60 * 60 * 24;
    const oneYear = oneDay * 365;
    const oneMonth = oneDay * 30;
    const oneWeek = oneDay * 7;
    let unit = oneWeek;
    if (period.includes('Y')) {
      unit = oneYear;
    } else if (period.includes('M')) {
      unit = oneMonth;
    } else if (period.includes('W')) {
      unit = oneWeek;
    }

    const time = parseInt(period[0]) || 2;
    const from = now - unit * time;

    return { from, to: now };
  }
}
