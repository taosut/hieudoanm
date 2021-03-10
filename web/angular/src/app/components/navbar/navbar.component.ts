import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faCog,
  faUniversity,
  faSignOutAlt,
  faWallet,
  faMoneyBillWave,
  faListAlt,
  faBell,
  faTimes,
  faSignInAlt,
  faUserPlus,
  faCoins,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { StorageService } from '../../services';
import { signOut } from '../../store/actions';

interface NavItem {
  link: string;
  icon: IconDefinition;
  text: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public faSignOutAlt: IconDefinition = faSignOutAlt;

  public faTimes: IconDefinition = faTimes;

  public isAuthenticated: boolean = false;
  public navbar: string = 'navbar-primary';

  public leftAppsNavItems: Array<NavItem> = [
    { link: '/summary', icon: faUniversity, text: 'Summary' },
    { link: '/transactions', icon: faListAlt, text: 'Transactions' },
    { link: '/transfer', icon: faMoneyBillWave, text: 'Transfer' },
    { link: '/wallet', icon: faWallet, text: 'Wallet' }
  ];

  public rightAppsNavItems: Array<NavItem> = [
    { link: '/notifications', icon: faBell, text: 'Notifications' },
    { link: '/settings', icon: faCog, text: 'Settings' }
  ];

  public globalAppsNavItems: Array<NavItem> = [
    { link: '/forex', icon: faCoins, text: 'Forex' },
    { link: '/stock', icon: faChartLine, text: 'Stock' }
  ];

  public rightBasicNavItems: Array<NavItem> = [
    { link: '/sign-in', icon: faSignInAlt, text: 'Sign In' },
    { link: '/sign-up', icon: faUserPlus, text: 'Sign Up' }
  ];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private storageService: StorageService
  ) {
    this.store
      .select(state => state)
      .subscribe(state => {
        const {
          authentication: { isAuthenticated },
          theme: { navbar }
        } = state;
        this.isAuthenticated = isAuthenticated;
        this.navbar = navbar;
      });
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.store
      .select(state => state.authentication.isAuthenticated)
      .toPromise();
  }

  public logOut(event: Event): void {
    event.preventDefault();
    this.setAuthentication();
    this.router.navigateByUrl('/');
  }

  private setAuthentication(): void {
    this.storageService.setCookie('isAuthenticated', 'false');
    this.storageService.setCookie('token', '');
    this.store.dispatch(signOut({ token: '', isAuthenticated: false }));
  }
}
