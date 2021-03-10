import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, NotificationsService, UtilsService } from '../../services';

@Component({
  selector: 'app-card-me',
  templateUrl: './card-me.component.html',
  styleUrls: ['./card-me.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardMeComponent implements OnInit {
  public user: any = {};
  public loading: boolean = true;
  public existFlag: boolean = true;

  public payForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required])
  });

  public backgroundCover: string = 'bg-primary';
  public button: string = 'btn-primary';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme)
      .subscribe((theme: any) => {
        this.backgroundCover = theme.backgroundCover;
        this.button = theme.button;
      });
  }

  async ngOnInit(): Promise<void> {
    const self = this;

    this.activatedRoute.paramMap.subscribe(async (paramMap: any) => {
      const username: string = paramMap.get('username') || '';
      await self.getMe(username);
    });
  }

  public async getMe(username: string): Promise<void> {
    this.loading = true;
    const me = await this.apisService.getMe(username);
    this.loading = false;
    this.existFlag = !this.utilsService.isEmpty(me);
    console.log(me, this.existFlag);
    this.user = me;
  }

  public async pay(email: string): Promise<void> {
    const amount: number = this.payForm.get('amount')?.value;
    const description: string = 'Transfer me';
    if (!amount) return;
    const payResponse = await this.apisService.pay(email, amount, description);
    this.notificationsService.publish('SUCCEED!');
    console.log(payResponse);
  }
}
