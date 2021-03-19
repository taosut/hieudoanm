import Vietcetera from 'vietcetera';

import DevTo from './dev-to';
import GitHub from './github';
import USACongress from './usa-congress';

export const devTo: DevTo = new DevTo();

const GITHUB_TOKEN: string = process.env.GITHUB_TOKEN || '';
export const gitHub: GitHub = new GitHub(GITHUB_TOKEN);

const API_KEY_PROPUBLICA: string = process.env.API_KEY_PROPUBLICA || '';
export const usaCongress: USACongress = new USACongress(API_KEY_PROPUBLICA);

export const vietcetera: Vietcetera = new Vietcetera();
