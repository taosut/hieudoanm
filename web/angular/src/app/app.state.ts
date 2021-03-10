import { IAuthentication, ITheme } from './models';

export interface AppState {
  readonly authentication: IAuthentication;
  readonly theme: ITheme;
}
