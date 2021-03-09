import USACongress from './usa/congress';

const API_KEY_PROPUBLICA: string = process.env.API_KEY_PROPUBLICA || '';
export const usaCongress: USACongress = new USACongress(API_KEY_PROPUBLICA);
