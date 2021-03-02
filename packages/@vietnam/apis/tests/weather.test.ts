'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { weather } from '../src/';

describe('weather', () => {
  it('get weather', async () => {
    const city: string = 'hanoi';
    const currentWeather: Record<string, any> = await weather.getWeather(city);
    console.log(currentWeather);
    assert.ok(typeof currentWeather === 'object');
  });

  it('get air visual', async () => {
    const city: string = 'hanoi';
    const airVisual = await weather.getAirVisual(city);
    console.log(airVisual);
    assert.ok(typeof airVisual === 'object');
  });

  it('get air visual cities', async () => {
    const airVisualCities = await weather.getAirVisualCities();
    console.log(airVisualCities);
    assert.ok(typeof airVisualCities === 'object' && airVisualCities.length > 0);
  });
});
