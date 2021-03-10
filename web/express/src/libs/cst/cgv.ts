'use strict';

import puppeteer from 'puppeteer';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

export default class CGV {
  private async fetch(url: string): Promise<Array<Record<string, any>>> {
    let browser = null;
    let movies: Array<Record<string, any>> = [];
    try {
      const headless: boolean = NODE_ENV !== 'development';
      browser = await puppeteer.launch({ headless, args: ['--no-sandbox', '--no-zygote'] });
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(300000);
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url, { waitUntil: 'networkidle0' });
      // await page.waitForNavigation({ waitUntil: 'networkidle0' });

      movies = await page.$$eval('.cgv-movies .product-info .product-name a', rows =>
        rows.map((row: Record<string, any>) => {
          const name: string = row.innerText;
          const url: string = row.getAttribute('href');
          return { name, url };
        })
      );

      movies.sort((a, b) => (a.name > b.name ? 1 : -1));

      console.log('CGV fetch() movies', movies);
    } catch (error) {
      console.error(error);
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }
    return movies;
  }

  public async getNowShowing(): Promise<Array<Record<string, any>>> {
    const url: string = 'https://www.cgv.vn/default/movies/now-showing.html/';
    const movies: Array<Record<string, any>> = await this.fetch(url);
    return movies;
  }

  public async getComingSoon(): Promise<Array<Record<string, any>>> {
    const url: string = 'https://www.cgv.vn/default/movies/coming-soon-1.html';
    const movies: Array<Record<string, any>> = await this.fetch(url);
    return movies;
  }
}
