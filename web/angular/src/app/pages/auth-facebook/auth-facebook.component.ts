import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { signIn } from '../../store/actions';
import { ApisService, StorageService, NotificationsService } from '../../services';

@Component({
  selector: 'app-auth-facebook',
  templateUrl: './auth-facebook.component.html',
  styleUrls: ['./auth-facebook.component.scss']
})
export class AuthFacebookComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private apisService: ApisService,
    private storageService: StorageService,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const self = this;
    this.activatedRoute.queryParams.subscribe(async (params: any) => {
      const { code } = params;
      await self.signInWithFacebook(code);
    });
  }

  private async signInWithFacebook(code: string) {
    const { token, errorMessage } = await this.apisService.signInWithFacebook(code);
    if (token) {
      this.setAuthentication(token);
      this.router.navigateByUrl('/summary');
    } else if (errorMessage) {
      this.notificationsService.publish(errorMessage);
      this.router.navigateByUrl('/sign-in');
    }
  }

  private setAuthentication(token: string) {
    this.storageService.setCookie('isAuthenticated', 'true');
    this.storageService.setCookie('token', token);
    this.store.dispatch(signIn({ token, isAuthenticated: true }));
  }
}
