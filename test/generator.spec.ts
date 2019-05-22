import * as mocha from 'mocha';
// import { expect } from 'chai';

import { runGenerator, runBuild, initFolder } from './index';

const presets = [
  { name: 'Default', preset: './presets/default.json', proj: 'sppp-default' },
  { name: 'React', preset: './presets/react.json', proj: 'sppp-react' },
  { name: 'React + Office UI Fabric', preset: './presets/office-ui-fabric.json', proj: 'sppp-office-ui-fabric' }
];

console.log('Debug message', { cwd: process.cwd(), dirname: __dirname });

describe(`SPPP tests`, () => {
  for (const p of presets) {
    describe(`${p.name} preset`, () => {

      before('initiate folder', function(done: Mocha.Done): void {
        this.timeout(30 * 1000);
        initFolder(__dirname, p.proj, p.preset);
        done();
      });

      it(`should generate project & restore dependencies`, function(done: Mocha.Done): void {
        this.timeout(3 * 60 * 1000);
        runGenerator(__dirname, p.proj, true, true).then(() => done()).catch(done);
      });

      it(`should validate linting rules & build project`, function(done: Mocha.Done): void {
        this.timeout(2 * 60 * 1000);
        runBuild(__dirname, p.proj, true).then(() => done()).catch(done);
      });

    });
  }
});
