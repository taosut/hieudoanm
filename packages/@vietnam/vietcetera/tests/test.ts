'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import Vietcetera from '../src';

describe('vietcetera', () => {
  const vietcetera: Vietcetera = new Vietcetera();

  it('get favorist topics', async () => {
    const favoristTopics = await vietcetera.getFavoristTopics();
    console.log('favoristTopics', favoristTopics.length, favoristTopics);
    assert.ok(typeof favoristTopics === 'object');
  });

  it('get latest articles', async () => {
    const latestArticles = await vietcetera.getLatestArticles();
    console.log('latestArticles', latestArticles.length, latestArticles);
    assert.ok(typeof latestArticles === 'object');
  });

  it('get popular articles', async () => {
    const popularArticles = await vietcetera.getPopularArticles();
    console.log('popularArticles', popularArticles.length, popularArticles);
    assert.ok(typeof popularArticles === 'object');
  });

  it('get editor pick articles', async () => {
    const editorPickArticles = await vietcetera.getEditorPickArticles();
    console.log('editorPickArticles', editorPickArticles.length, editorPickArticles);
    assert.ok(typeof editorPickArticles === 'object');
  });

  it('get recommend popular articles', async () => {
    const recommendPopularArticles = await vietcetera.getArticles({ type: 'recommend-popular' });
    console.log(
      'recommendPopularArticles',
      recommendPopularArticles.length,
      recommendPopularArticles
    );
    assert.ok(typeof recommendPopularArticles === 'object');
  });
});
