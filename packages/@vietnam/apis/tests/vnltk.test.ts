'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { vnltk } from '../src/';

describe('vnltk', () => {
  it('get words', async () => {
    const words = vnltk.getWords();
    console.log(words);
    assert.ok(typeof words === 'object' && words.length > 0);
  });

  it('get stop words', async () => {
    const stopWords = vnltk.getStopWords();
    console.log(stopWords);
    assert.ok(typeof stopWords === 'object' && stopWords.length > 0);
  });

  it('get names', async () => {
    const names = vnltk.getNames();
    console.log(names);
    assert.ok(typeof names === 'object' && names.length > 0);
  });

  it('get family names', async () => {
    const familyNames = vnltk.getFamilyNames();
    console.log(familyNames);
    assert.ok(typeof familyNames === 'object' && familyNames.length > 0);
  });

  it('get first names', async () => {
    const firstNames = vnltk.getFirstNames();
    console.log(firstNames);
    assert.ok(typeof firstNames === 'object' && firstNames.length > 0);
  });

  it('get proverbs', async () => {
    const proverbs = vnltk.getProverbs();
    console.log(proverbs);
    assert.ok(typeof proverbs === 'object' && proverbs.length > 0);
  });

  it('latinize', async () => {
    const result = vnltk.latinize('Hiếu Đoàn');
    console.log(result);
    assert.ok(result === 'Hieu Doan');
  });

  it('convert number to text', async () => {
    const text = vnltk.convertNumberToText(1995);
    console.log(text);
    assert.ok(text === 'một nghìn chín trăm chín mươi lăm');
  });
});
