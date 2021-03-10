import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { signIn } from '../../store/actions';
import { ApisService, StorageService, NotificationsService } from '../../services';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: './auth-sign-in.component.html',
  styleUrls: ['./auth-sign-in.component.scss']
})
export class AuthSignInComponent implements OnInit {
  public faEye: IconDefinition = faEye;
  public faEyeSlash: IconDefinition = faEyeSlash;

  public signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  // public username: string = '';
  // public password: string = '';

  public showPassword: boolean = false;

  public loading: boolean = false;

  public linkColor: string = 'text-primary';
  public button: string = 'btn-primary';
  public buttonOutline: string = 'btn-outline-primary';

  public facebookAuthURL: string = '';
  public googleAuthURL: string = '';

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

  async ngOnInit(): Promise<void> {
    this.facebookAuthURL = await this.getFacebookAuthURL();
    this.googleAuthURL = await this.getGoogleAuthURL();
  }

  public async getGoogleAuthURL(): Promise<string> {
    const { url } = await this.apisService.getGoogleAuthURL();
    return url;
  }

  public async getFacebookAuthURL(): Promise<string> {
    const { url } = await this.apisService.getFacebookAuthURL();
    return url;
  }

  public async signIn(): Promise<void> {
    const username: string = this.signInForm.get('username')?.value;
    const password: string = this.signInForm.get('password')?.value;
    this.loading = true;
    const { token, errorMessage } = await this.apisService.signIn(username, password);
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
    this.store.dispatch(signIn({ token, isAuthenticated: true }));
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
