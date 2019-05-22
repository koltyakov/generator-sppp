import { runGenerator, initFolder } from '../index';

const headless = process.argv.slice(2).indexOf('--headless') !== -1;

initFolder(__dirname, 'sppp', './.yo-rc.json');
runGenerator(__dirname, 'sppp', headless, false)
  .then(() => console.log(`\n=== Done: ${__dirname} ===`))
  .catch(console.error);
