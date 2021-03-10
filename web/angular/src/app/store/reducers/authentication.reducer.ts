import { createReducer, on } from '@ngrx/store';

import { authenticate, signIn, signUp, signOut } from '../actions/authentication.actions';

import { IAuthentication } from '../../models';

export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

const INITIAL_STATE: IAuthentication = {
  token: '',
  isAuthenticated: false
};

const _authenticationReducer = createReducer(
  INITIAL_STATE,
  on(authenticate, (state: any, action: any) => {
    const { token, isAuthenticated } = action;
    return { ...state, token, isAuthenticated };
  }),
  on(signIn, (state: any, action: any) => {
    const { token, isAuthenticated } = action;
    return { ...state, token, isAuthenticated };
  }),
  on(signUp, (state: any, action: any) => {
    const { token, isAuthenticated } = action;
    return { ...state, token, isAuthenticated };
  }),
  on(signOut, (state: any, action: any) => {
    const { token, isAuthenticated } = action;
    return { ...state, token, isAuthenticated };
  })
);

export function authenticationReducer(state: any, action: any) {
  return _authenticationReducer(state, action);
}
