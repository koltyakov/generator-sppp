import { runInSeparateProcess, killProcessTree } from '../utils';

const headless = process.argv.slice(2).indexOf('--headless') !== -1;

const command = `cd ./test/tmp/sppp-default && npm run start`;

runInSeparateProcess(
  command,
  (data) => {
    if (data.indexOf(': Compiled successfully.') !== -1) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
  headless
)
  .then(async (shell) => {
    if (shell) {
      return killProcessTree(shell.pid);
    }
  })
  .then(() => console.log(`\n=== Done: ${__dirname} ===`))
  .catch(console.error);
