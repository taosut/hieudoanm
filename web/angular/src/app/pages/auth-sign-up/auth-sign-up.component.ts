import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { signUp } from '../../store/actions';
import { ApisService, StorageService, NotificationsService } from '../../services';

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrls: ['./auth-sign-up.component.scss']
})
export class AuthSignUpComponent implements OnInit {
  public signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  public loading: boolean = false;

  public linkColor: string = 'text-primary';
  public button: string = 'btn-primary';
  public buttonOutline: string = 'btn-outline-primary';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private apisService: ApisService,
    private storageService: StorageService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme)
      .subscribe((theme: any) => {
        this.linkColor = theme.linkColor;
        this.button = theme.button;
        this.buttonOutline = theme.buttonOutline;
      });
  }

  ngOnInit(): void {}

  public async signUp(): Promise<void> {
    const email: string = this.signUpForm.get('email')?.value;
    const phoneNumber: string = this.signUpForm.get('phoneNumber')?.value;
    const password: string = this.signUpForm.get('password')?.value;
    const confirmPassword: string = this.signUpForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.notificationsService.publish('Passwords is not matched');
      return;
    }

    this.loading = true;
    const { token, errorMessage } = await this.apisService.signUp(email, phoneNumber, password);
    this.loading = false;

    if (token) {
      this.setAuthentication(token);
      this.router.navigateByUrl('/summary');
    } else if (errorMessage) {
      this.notificationsService.publish(errorMessage);
    }
  }

  private setAuthentication(token: string) {
    this.storageService.setCookie('isAuthenticated', 'true');
    this.storageService.setCookie('token', token);
    this.store.dispatch(signUp({ token, isAuthenticated: true }));
  }
}
