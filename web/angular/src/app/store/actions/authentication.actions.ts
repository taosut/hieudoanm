import { createAction, props } from '@ngrx/store';

export const signIn = createAction('SIGN IN', props<{ token: string; isAuthenticated: boolean }>());
export const signUp = createAction('SIGN UP', props<{ token: string; isAuthenticated: boolean }>());
export const signOut = createAction(
  'SIGN OUT',
  props<{ token: string; isAuthenticated: boolean }>()
);
export const authenticate = createAction(
  'AUTHENTICATE',
  props<{ token: string; isAuthenticated: boolean }>()
);
