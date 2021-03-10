import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

import { authenticate, switchTheme } from './store/actions';

import { AppState } from './app.state';
import { StorageService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private storageService: StorageService) {
    const theme = this.storageService.getCookie('theme');
    const token: string = this.storageService.getCookie('token');
    const isAuthenticated = this.storageService.getCookie('isAuthenticated') === 'true';
    this.store.dispatch(switchTheme({ theme }));
    this.store.dispatch(authenticate({ token, isAuthenticated }));
  }

  ngOnInit(): void {}
}
