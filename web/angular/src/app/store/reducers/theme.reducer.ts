import { createReducer, on } from '@ngrx/store';

import { switchTheme } from '../actions/theme.actions';

import { ITheme } from '../../models';

export const SWITCH_TO_RED: string = 'SWITCH_TO_RED';
export const SWITCH_TO_BLUE: string = 'SWITCH_TO_BLUE';
export const SWITCH_TO_DARK: string = 'SWITCH_TO_DARK';

const RED_THEME: ITheme = {
  lineChartColor: '#dc3545',
  background: 'bg-danger',
  navbar: 'bg-danger',
  footer: 'bg-danger',
  button: 'btn-danger',
  buttonOutline: 'btn-outline-danger',
  linkColor: 'text-danger',
  spinner: 'text-danger',
  badge: 'badge-danger',
  textColor: 'text-danger',
  backgroundCover: 'bg-danger'
};

const BLUE_STATE: ITheme = {
  lineChartColor: '#007bff',
  background: 'bg-primary',
  navbar: 'bg-primary',
  footer: 'bg-primary',
  button: 'btn-primary',
  buttonOutline: 'btn-outline-primary',
  linkColor: 'text-primary',
  spinner: 'text-primary',
  badge: 'badge-primary',
  textColor: 'text-primary',
  backgroundCover: 'bg-primary'
};

const CYAN_STATE: ITheme = {
  lineChartColor: '#17a2b8',
  background: 'bg-info',
  navbar: 'bg-info',
  footer: 'bg-info',
  button: 'btn-info',
  buttonOutline: 'btn-outline-info',
  linkColor: 'text-info',
  spinner: 'text-info',
  badge: 'badge-info',
  textColor: 'text-info',
  backgroundCover: 'bg-info'
};

const DARK_THEME: ITheme = {
  lineChartColor: '#343a40',
  background: 'bg-dark',
  navbar: 'bg-dark',
  footer: 'bg-dark',
  button: 'btn-dark',
  buttonOutline: 'btn-outline-dark',
  linkColor: 'text-dark text-underline',
  spinner: 'text-dark',
  badge: 'badge-dark',
  textColor: 'text-dark',
  backgroundCover: 'bg-dark'
};

const GREEN_THEME: ITheme = {
  lineChartColor: '#28a745',
  background: 'bg-success',
  navbar: 'bg-success',
  footer: 'bg-success',
  button: 'btn-success',
  buttonOutline: 'btn-outline-success',
  linkColor: 'text-success',
  spinner: 'text-success',
  badge: 'badge-success',
  textColor: 'text-success',
  backgroundCover: 'bg-success'
};

const YELLOW_THEME: ITheme = {
  lineChartColor: '#ffc107',
  background: 'bg-warning',
  navbar: 'bg-warning',
  footer: 'bg-warning',
  button: 'btn-warning',
  buttonOutline: 'btn-outline-warning',
  linkColor: 'text-warning',
  spinner: 'text-warning',
  badge: 'badge-warning',
  textColor: 'text-warning',
  backgroundCover: 'bg-warning'
};

const themes: any = {
  red: RED_THEME,
  blue: BLUE_STATE,
  cyan: CYAN_STATE,
  dark: DARK_THEME,
  green: GREEN_THEME,
  yellow: YELLOW_THEME
};

const _themeReducer = createReducer(
  BLUE_STATE,
  on(switchTheme, (state: any, action: any) => {
    const { theme = '' } = action;
    const selectedTheme: ITheme = themes[theme];
    return { ...state, ...selectedTheme };
  })
);

export function themeReducer(state: any, action: any) {
  return _themeReducer(state, action);
}
