import * as mocha from 'mocha';
import { expect } from 'chai';
import * as puppeteer from 'puppeteer';

import { initFolder, runGenerator, runBuild, serve, wrapPromiseTest } from './utils';

const presets = [
  { name: 'Default', preset: './presets/default.json', proj: 'sppp-default' },
  { name: 'React', preset: './presets/react.json', proj: 'sppp-react' },
  { name: 'React + Office UI Fabric', preset: './presets/office-ui-fabric.json', proj: 'sppp-office-ui-fabric' }
];

describe(`SPPP tests`, () => {
  for (const p of presets) {
    describe(`${p.name} preset`, () => {

      before('initiate folder', function(done: Mocha.Done): void {
        this.timeout(30 * 1000);
        initFolder(__dirname, p.proj, p.preset);
        done();
      });

      it(`should generate project & restore dependencies`, function(done: Mocha.Done): void {
        this.timeout(5 * 60 * 1000);
        wrapPromiseTest(runGenerator(__dirname, p.proj, true, true), done);
      });

      it(`should validate linting rules & build project`, function(done: Mocha.Done): void {
        this.timeout(2 * 60 * 1000);
        wrapPromiseTest(runBuild(__dirname, p.proj, true), done);
      });

      it(`should serve & work in browser`, function(done: Mocha.Done): void {
        this.timeout(2 * 60 * 1000);
        const headless = true;
        const browserTests = async (): Promise<void> => {
          const browser = await puppeteer.launch({ headless });
          const page = await browser.newPage();
          const port = 9090; // might be dynamic in future
          const siteUrl = `http://localhost:${port}/webparts/example.cewp.html`;
          await page.goto(siteUrl, { waitUntil: 'networkidle2' });
          const content = await page.evaluate(() => {
            const c = document.querySelector('#example-cewp-container');
            return c ? c.innerHTML : null;
          });
          await browser.close();
          if (content === null || content.trim().length === 0) {
            throw new Error('Web app return no data, something wrong.');
          }
        };
        wrapPromiseTest(serve({
          rootFolder: __dirname,
          projName: p.proj,
          browserTests,
          headless
        }), done);
      });

    });
  }
});
