import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { signIn } from '../../store/actions';
import { ApisService, StorageService, NotificationsService } from '../../services';

@Component({
  selector: 'app-auth-google',
  templateUrl: './auth-google.component.html',
  styleUrls: ['./auth-google.component.scss']
})
export class AuthGoogleComponent implements OnInit {
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
      await self.signInWithGoogle(code);
    });
  }

  private async signInWithGoogle(code: string) {
    const { token, errorMessage } = await this.apisService.signInWithGoogle(code);
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
