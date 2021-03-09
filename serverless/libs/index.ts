import USACongress from './usa/congress';
import GitHub from './github';

const API_KEY_PROPUBLICA: string = process.env.API_KEY_PROPUBLICA || '';
export const usaCongress: USACongress = new USACongress(API_KEY_PROPUBLICA);

const GITHUB_TOKEN: string = process.env.GITHUB_TOKEN || '';
export const gitHub: GitHub = new GitHub(GITHUB_TOKEN);
