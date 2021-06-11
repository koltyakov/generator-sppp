import * as mocha from 'mocha';
import { expect } from 'chai';
import * as puppeteer from 'puppeteer';

import { initFolder, runGenerator, runBuild, serve, wrapPromiseTest, checkDeps, runNpmInstall } from './utils';
import { presets } from './presets';

describe(`SPPP tests`, () => {
  for (const p of presets) {
    describe(`${p.name} preset`, () => {

      before('initiate folder', function(done: Mocha.Done): void {
        this.timeout(60 * 1000);
        initFolder(__dirname, p.proj, p.preset);
        done();
      });

      // it(`should generate project & restore dependencies`, function(done: Mocha.Done): void {
      //   this.timeout(10 * 60 * 1000);
      //   wrapPromiseTest(runGenerator(__dirname, p.proj, true, false, true), done);
      // });

      it(`should generate project `, function(done: Mocha.Done): void {
        wrapPromiseTest(runGenerator(__dirname, p.proj, true, true, true), done);
      }).timeout(1 * 60 * 1000);

      it(`should validate some preset required dependencies`, function(done: Mocha.Done): void {
        wrapPromiseTest(checkDeps(__dirname, p.proj, p.checkFor.delendencies), done);
      }).timeout(3 * 1000);

      it(`should validate some preset required dev dependencies`, function(done: Mocha.Done): void {
        wrapPromiseTest(checkDeps(__dirname, p.proj, p.checkFor.devDependencies, true), done);
      }).timeout(3 * 1000);

      it(`should restore dependencies`, function(done: Mocha.Done): void {
        wrapPromiseTest(runNpmInstall(__dirname, p.proj, true), done);
      }).timeout(10 * 60 * 1000);

      it(`should validate linting rules & build project`, function(done: Mocha.Done): void {
        wrapPromiseTest(runBuild(__dirname, p.proj, true), done);
      }).timeout(10 * 60 * 1000);

      it(`should serve & work in browser`, function(done: Mocha.Done): void {
        const headless = true;

        const browserTests = async (): Promise<void> => {
          const containerSelector = '#example-cewp-container';

          const browser = await puppeteer.launch({ headless });
          const page = await browser.newPage();
          const port = 9090; // might be dynamic in future
          const siteUrl = `http://localhost:${port}/webparts/example.cewp.html`;
          await page.goto(siteUrl, { waitUntil: [ 'domcontentloaded', 'networkidle2' ] });

          const checkContentWithRetries = async (retriesCnt: number): Promise<string> => {
            const data: string | null = await page.evaluate((selector: string) => {
              const containerEl = document.querySelector(selector);
              return containerEl ? containerEl.innerHTML : null;
            }, containerSelector);
            if ((data === null || data.trim().length === 0) && retriesCnt > 0) {
              retriesCnt -= 1;
              await page.waitForFunction(() => {
                return new Promise((resolve) => {
                  setTimeout(resolve, 3000);
                });
              });
              return checkContentWithRetries(retriesCnt);
            }
            return data || '';
          };

          const content = await checkContentWithRetries(3);

          await browser.close();
          if (content === null) {
            throw new Error('App container was not found on the page.');
          } else if (content.trim().length === 0) {
            throw new Error('Web app return no data, something wrong.');
          }
        };

        wrapPromiseTest(serve({
          rootFolder: __dirname,
          projName: p.proj,
          browserTests,
          headless,
          timeout: 10 * 60 * 1000,
          mochaContext: this
        }), done);
      }).timeout(10 * 60 * 1000);

    });
  }
});
