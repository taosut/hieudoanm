import { createAction, props } from '@ngrx/store';

export const switchTheme = createAction('SWITCH_THEME', props<{ theme: string }>());
