'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { youTube } from '../src/';

describe('youtube', () => {
  it('get video categories', async () => {
    const videoCategories: Array<Record<string, any>> = await youTube.getVideoCategories();
    console.log(videoCategories);
    assert.ok(typeof videoCategories === 'object' && videoCategories.length > 0);
  });

  it('get trending', async () => {
    const videos: Array<Record<string, any>> = await youTube.getTrending();
    console.log(videos);
    assert.ok(typeof videos === 'object' && videos.length > 0);
  });

  it('get music trending', async () => {
    const videos: Array<Record<string, any>> = await youTube.getMusicTrending();
    console.log(videos);
    assert.ok(typeof videos === 'object' && videos.length > 0);
  });
});
