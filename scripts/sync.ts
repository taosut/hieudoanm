'use strict';

import { buildREADME } from './build-readme';
import { syncForexRates } from './services/forex-rates';
import { syncGHN } from './services/ghn';
import { syncMovies } from './services/movies';
import { syncNews } from './services/news';
import { syncStacks } from './services/stacks';
import { syncStock } from './services/stock';
import { syncVisas } from './services/visas';
import { syncVLeague } from './services/vleague';
import { syncYouTubeVideoCategories } from './services/youtube-video-categories';

const main = async () => {
  console.log('Build README');
  await buildREADME();
  console.log('Sync Forex Rates');
  await syncForexRates();
  console.log('Sync Giao Hang Nhanh');
  await syncGHN();
  console.log('Sync Movies');
  await syncMovies();
  console.log('Sync News');
  await syncNews(100, true);
  console.log('Sync Stacks');
  await syncStacks();
  console.log('Sync Stock');
  await syncStock();
  console.log('Sync Visas');
  await syncVisas();
  console.log('Sync VLeague');
  await syncVLeague();
  console.log('Sync YouTube Video Categories');
  await syncYouTubeVideoCategories();

  process.exit(0);
};

main().catch(error => console.error(error));
