import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-auth-password-change',
  templateUrl: './auth-password-change.component.html',
  styleUrls: ['./auth-password-change.component.scss']
})
export class AuthPasswordChangeComponent implements OnInit {
  public changeForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  public token: string = '';
  public loading: boolean = false;

  constructor(
    private apisService: ApisService,
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    const self = this;
    this.activatedRoute.queryParams.subscribe((params: any) => {
      const { token } = params;
      self.token = token;
    });
  }

  public async changePassword(): Promise<void> {
    const { token } = this;
    const password: string = this.changeForm.get('password')?.value;
    const confirmPassword: string = this.changeForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.notificationsService.publish('Passwords is not matched');
      return;
    }

    this.loading = true;
    const { status } = await this.apisService.changePassword(token, password);
    this.loading = false;
    this.notificationsService.publish('UPDATED!');
  }
}
