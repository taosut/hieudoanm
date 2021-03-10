import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-card-transfer-pay',
  templateUrl: './card-transfer-pay.component.html',
  styleUrls: ['./card-transfer-pay.component.scss']
})
export class CardTransferPayComponent implements OnInit {
  public payForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  public button: string = 'btn-primary';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme)
      .subscribe((theme: any) => {
        this.button = theme.button;
      });
  }

  ngOnInit(): void {
    const self = this;
    this.activatedRoute.queryParams.subscribe((params: any) => {
      const { email } = params;
      self.payForm.patchValue({ email });
    });
  }

  public updateSearchResults(searchResult: any = {}) {
    const { email = '' } = searchResult;
    this.payForm.patchValue({ email });
  }

  public async pay(): Promise<void> {
    const email: string = this.payForm.get('email')?.value;
    const amount: number = this.payForm.get('amount')?.value;
    const description: string = this.payForm.get('description')?.value;
    if (!amount) return;
    const payResponse = await this.apisService.pay(email, amount, description);
    this.notificationsService.publish('SUCCEED!');
    console.log(payResponse);
  }
}
