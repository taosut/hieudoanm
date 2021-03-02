'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { music } from '../src/';

describe('music', () => {
  it('get artists', async () => {
    const artists = await music.getArtists();
    console.log(artists);
    assert.ok(typeof artists === 'object' && artists.length > 0);
  });
});
