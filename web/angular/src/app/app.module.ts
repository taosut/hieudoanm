import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";

// Reducers
import { StoreModule } from "@ngrx/store";
import { authenticationReducer } from "./store/reducers/authentication.reducer";
import { themeReducer } from "./store/reducers/theme.reducer";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// Components
import { NavPillsComponent } from "./components/nav-pills/nav-pills.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { BadgeComponent } from "./components/badge/badge.component";
import { ButtonComponent } from "./components/button/button.component";
import { ButtonOutlineComponent } from "./components/button-outline/button-outline.component";
import { LinkComponent } from "./components/link/link.component";
import { LinkButtonComponent } from "./components/link-button/link-button.component";
import { ToastComponent } from "./components/toast/toast.component";
// Auth
import { AuthPasswordForgetComponent } from "./pages/auth-password-forget/auth-password-forget.component";
import { AuthPasswordChangeComponent } from "./pages/auth-password-change/auth-password-change.component";
import { AuthSignInComponent } from "./pages/auth-sign-in/auth-sign-in.component";
import { AuthSignUpComponent } from "./pages/auth-sign-up/auth-sign-up.component";
import { AuthGoogleComponent } from "./pages/auth-google/auth-google.component";
import { AuthFacebookComponent } from "./pages/auth-facebook/auth-facebook.component";
// Docs
import { DocsHomeComponent } from "./pages/docs-home/docs-home.component";
import { DocsAboutComponent } from "./pages/docs-about/docs-about.component";
// Apps
import { AppsSummaryComponent } from "./pages/apps-summary/apps-summary.component";
import { AppsTransactionsComponent } from "./pages/apps-transactions/apps-transactions.component";
import { AppsTransferComponent } from "./pages/apps-transfer/apps-transfer.component";
import { AppsTransferPayComponent } from "./pages/apps-transfer-pay/apps-transfer-pay.component";
import { AppsTransferRequestComponent } from "./pages/apps-transfer-request/apps-transfer-request.component";
import { AppsTransferContactsComponent } from "./pages/apps-transfer-contacts/apps-transfer-contacts.component";
import { AppsWalletComponent } from "./pages/apps-wallet/apps-wallet.component";
import { AppsSettingsComponent } from "./pages/apps-settings/apps-settings.component";
import { AppsMeComponent } from "./pages/apps-me/apps-me.component";
import { AppsNotificationsComponent } from "./pages/apps-notifications/apps-notifications.component";
import { AppsForexComponent } from "./pages/apps-forex/apps-forex.component";
import { AppsStockComponent } from "./pages/apps-stock/apps-stock.component";
import { AppsQrcodesComponent } from "./pages/apps-qrcodes/apps-qrcodes.component";
import { AppsQrcodesFormComponent } from "./pages/apps-qrcodes-form/apps-qrcodes-form.component";
import { AppsQrcodesInfoComponent } from "./pages/apps-qrcodes-info/apps-qrcodes-info.component";
// Cards
import { CardAuthComponent } from "./widgets/card-auth/card-auth.component";
import { CardAddressesComponent } from "./widgets/card-addresses/card-addresses.component";
import { CardEmailsComponent } from "./widgets/card-emails/card-emails.component";
import { CardPhoneNumbersComponent } from "./widgets/card-phone-numbers/card-phone-numbers.component";
import { CardProfileComponent } from "./widgets/card-profile/card-profile.component";
import { CardBalanceComponent } from "./widgets/card-balance/card-balance.component";
import { CardTransferPayComponent } from "./widgets/card-transfer-pay/card-transfer-pay.component";
import { CardBanksComponent } from "./widgets/card-banks/card-banks.component";
import { CardSearchComponent } from "./widgets/card-search/card-search.component";
import { CardTransferRequestComponent } from "./widgets/card-transfer-request/card-transfer-request.component";
// Modals
import { ModalEmailsAddComponent } from "./widgets/modal-emails-add/modal-emails-add.component";
import { ModalPhoneNumbersAddComponent } from "./widgets/modal-phone-numbers-add/modal-phone-numbers-add.component";
import { ModalAddressesAddComponent } from "./widgets/modal-addresses-add/modal-addresses-add.component";
import { ModalBanksAddComponent } from "./widgets/modal-banks-add/modal-banks-add.component";
// List
import { ListTransactionsComponent } from "./widgets/list-transactions/list-transactions.component";
import { ListContactsComponent } from "./widgets/list-contacts/list-contacts.component";
import { ListSuggestionsComponent } from "./widgets/list-suggestions/list-suggestions.component";
import { ListNotificationsComponent } from "./widgets/list-notifications/list-notifications.component";
// Toast
import { ToastNotificationsComponent } from "./widgets/toast-notifications/toast-notifications.component";
import { CardMeComponent } from "./widgets/card-me/card-me.component";
import { AppsCameraComponent } from "./pages/apps-camera/apps-camera.component";

@NgModule({
  declarations: [
    AppComponent,
    // Components
    NavbarComponent,
    NavPillsComponent,
    FooterComponent,
    BadgeComponent,
    ButtonComponent,
    ButtonOutlineComponent,
    SpinnerComponent,
    LinkComponent,
    LinkButtonComponent,
    // Auth
    AuthPasswordForgetComponent,
    AuthPasswordChangeComponent,
    AuthSignInComponent,
    AuthSignUpComponent,
    AuthGoogleComponent,
    AuthFacebookComponent,
    // Docs
    DocsAboutComponent,
    DocsHomeComponent,
    // Apps
    AppsMeComponent,
    AppsSummaryComponent,
    AppsTransactionsComponent,
    AppsTransferPayComponent,
    AppsTransferRequestComponent,
    AppsWalletComponent,
    AppsSettingsComponent,
    AppsTransferContactsComponent,
    AppsTransferComponent,
    AppsNotificationsComponent,
    AppsForexComponent,
    AppsStockComponent,
    // Cards
    CardBalanceComponent,
    CardProfileComponent,
    CardAddressesComponent,
    CardEmailsComponent,
    CardPhoneNumbersComponent,
    CardTransferPayComponent,
    CardAuthComponent,
    CardBanksComponent,
    CardSearchComponent,
    CardTransferRequestComponent,
    // Modals
    ModalEmailsAddComponent,
    ModalPhoneNumbersAddComponent,
    ModalAddressesAddComponent,
    ModalBanksAddComponent,
    // List
    ListTransactionsComponent,
    ListContactsComponent,
    ListSuggestionsComponent,
    ListNotificationsComponent,
    // Toasts
    ToastNotificationsComponent,
    CardMeComponent,
    AppsCameraComponent,
    AppsQrcodesFormComponent,
    AppsQrcodesInfoComponent,
    AppsQrcodesComponent,
  ],
  entryComponents: [ToastComponent],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forRoot({
      authentication: authenticationReducer,
      theme: themeReducer,
    }),

    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
