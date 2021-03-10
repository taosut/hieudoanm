import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
// Auth
import { AuthPasswordForgetComponent } from './pages/auth-password-forget/auth-password-forget.component';
import { AuthPasswordChangeComponent } from './pages/auth-password-change/auth-password-change.component';
import { AuthSignInComponent } from './pages/auth-sign-in/auth-sign-in.component';
import { AuthSignUpComponent } from './pages/auth-sign-up/auth-sign-up.component';
import { AuthGoogleComponent } from './pages/auth-google/auth-google.component';
import { AuthFacebookComponent } from './pages/auth-facebook/auth-facebook.component';
// Docs
import { DocsHomeComponent } from './pages/docs-home/docs-home.component';
import { DocsAboutComponent } from './pages/docs-about/docs-about.component';
// Apps
import { AppsMeComponent } from './pages/apps-me/apps-me.component';
import { AppsNotificationsComponent } from './pages/apps-notifications/apps-notifications.component';
import { AppsSummaryComponent } from './pages/apps-summary/apps-summary.component';
import { AppsTransactionsComponent } from './pages/apps-transactions/apps-transactions.component';
import { AppsTransferComponent } from './pages/apps-transfer/apps-transfer.component';
import { AppsTransferPayComponent } from './pages/apps-transfer-pay/apps-transfer-pay.component';
import { AppsTransferRequestComponent } from './pages/apps-transfer-request/apps-transfer-request.component';
import { AppsTransferContactsComponent } from './pages/apps-transfer-contacts/apps-transfer-contacts.component';
import { AppsWalletComponent } from './pages/apps-wallet/apps-wallet.component';
import { AppsSettingsComponent } from './pages/apps-settings/apps-settings.component';
import { AppsForexComponent } from './pages/apps-forex/apps-forex.component';
import { AppsStockComponent } from './pages/apps-stock/apps-stock.component';

const routes: Routes = [
  { path: '', component: DocsHomeComponent },
  { path: 'about', component: DocsAboutComponent },
  { path: 'sign-in', component: AuthSignInComponent },
  { path: 'sign-up', component: AuthSignUpComponent },
  { path: 'forget-password', component: AuthPasswordForgetComponent },
  { path: 'change-password', component: AuthPasswordChangeComponent },
  { path: 'auth/facebook', component: AuthFacebookComponent },
  { path: 'auth/google', component: AuthGoogleComponent },
  { path: 'forex', component: AppsForexComponent },
  { path: 'stock', component: AppsStockComponent },
  {
    path: 'me',
    canActivate: [AuthGuard],
    component: AppsMeComponent
  },
  {
    path: 'me/:username',
    canActivate: [AuthGuard],
    component: AppsMeComponent
  },
  { path: 'notifications', canActivate: [AuthGuard], component: AppsNotificationsComponent },
  { path: 'summary', canActivate: [AuthGuard], component: AppsSummaryComponent },
  { path: 'transactions', canActivate: [AuthGuard], component: AppsTransactionsComponent },
  {
    path: 'transfer',
    canActivate: [AuthGuard],
    component: AppsTransferComponent,
    children: [
      {
        path: 'pay',
        canActivate: [AuthGuard],
        component: AppsTransferPayComponent
      },
      {
        path: 'request',
        canActivate: [AuthGuard],
        component: AppsTransferRequestComponent
      },
      {
        path: 'contacts',
        canActivate: [AuthGuard],
        component: AppsTransferContactsComponent
      },
      {
        path: '**',
        canActivate: [AuthGuard],
        component: AppsTransferPayComponent
      }
    ]
  },
  { path: 'wallet', canActivate: [AuthGuard], component: AppsWalletComponent },
  { path: 'settings', canActivate: [AuthGuard], component: AppsSettingsComponent },
  { path: '**', component: DocsHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
