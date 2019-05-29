import * as puppeteer from 'puppeteer';

const headless = process.argv.slice(2).indexOf('--headless') !== -1;

(async () => {

  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();

  const siteUrl = 'http://localhost:9090/webparts/example.cewp.html';

  await page.goto(siteUrl, { waitUntil: 'networkidle2' });

  const content = await page.evaluate(() => {
    const c = document.querySelector('#example-cewp-container');
    if (c) {
      return c.innerHTML;
    }
    return null;
  });

  console.log(content);

  await browser.close();

})()
  .catch(console.warn);
