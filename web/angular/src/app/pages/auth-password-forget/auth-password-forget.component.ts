import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-auth-password-forget',
  templateUrl: './auth-password-forget.component.html',
  styleUrls: ['./auth-password-forget.component.scss']
})
export class AuthPasswordForgetComponent implements OnInit {
  public forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public loading: boolean = false;

  constructor(
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}

  public async forgetPassword(): Promise<void> {
    const email: string = this.forgetForm.get('email')?.value;
    this.loading = true;
    const { status } = await this.apisService.forgetPassword(email);
    this.loading = false;
    this.notificationsService.publish('SENT!');
  }
}
