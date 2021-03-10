'use strict';

import puppeteer from 'puppeteer';

const USER: string = process.env.USER || '';
const PASS: string = process.env.PASS || '';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(300000);
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle0' });
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');

    await page.focus('input[name="username"]');
    await page.keyboard.type(USER);

    await page.focus('input[name="password"]');
    await page.keyboard.type(PASS);

    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.waitForSelector('input[placeholder="Search"]');
    await page.focus('input[placeholder="Search"]');
    await page.keyboard.type('junvu95');

    await page.waitForSelector('a[href="/junvu95/"]');
    await page.$eval('a[href="/junvu95/"]', (e: any) => e.click());

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // await autoScroll(page);

    // await page.goto(`https://www.instagram.com/${USER}`);

    // await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
