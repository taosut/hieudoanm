import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-card-transfer-request',
  templateUrl: './card-transfer-request.component.html',
  styleUrls: ['./card-transfer-request.component.scss']
})
export class CardTransferRequestComponent implements OnInit {
  public requestForm: FormGroup = new FormGroup({
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
      self.requestForm.patchValue({ email });
    });
  }

  public updateSearchResults(searchResult: any) {
    const { email = '' } = searchResult;
    this.requestForm.patchValue({ email });
  }

  public async sendRequest(): Promise<void> {
    const email: string = this.requestForm.get('email')?.value;
    const amount: number = this.requestForm.get('amount')?.value;
    const description: string = this.requestForm.get('description')?.value;
    if (!amount) return;
    const sendRequestResponse = await this.apisService.sendRequest(email, amount, description);
    this.notificationsService.publish('SUCCEED');
    console.log(sendRequestResponse);
  }
}
