import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { spawn } from 'child_process';

export const initFolder = (rootFolder: string, projName: string, rcFilePath = './.yo-rc.json') => {
  const projFolder = path.join(rootFolder, `./tmp/${projName}`);
  rimraf.sync(projFolder);
  fs.mkdirSync(projFolder, { recursive: true });
  fs.copyFileSync(path.join(rootFolder, rcFilePath), path.join(projFolder, '.yo-rc.json'));
};

export const runGenerator = (rootFolder: string, projName: string, headless = false, skipBuild = false): Promise<void> => {
  const projFolder = path.join(rootFolder, `./tmp/${projName}`);

  const relRootPath = path.relative(projFolder, process.cwd()).replace(/\\/g, '/');
  const cdToPath = path.relative(process.cwd(), projFolder).replace(/\\/g, '/');

  let shellSyntaxCommand = `cd ${cdToPath}`;
  shellSyntaxCommand += headless ? `&& yo ${relRootPath} --headless` : `&& yo ${relRootPath}`;
  shellSyntaxCommand += skipBuild ? '\n' : ' && npm run build\n';

  return runScript(shellSyntaxCommand, headless);
};

export const runBuild = (rootFolder: string, projectName: string, headless = false): Promise<void> => {
  const projFolder = path.join(rootFolder, `./tmp/${projectName}`);
  const cdToPath = path.relative(process.cwd(), projFolder).replace(/\\/g, '/');
  const shellSyntaxCommand = `cd ${cdToPath} && npm run build\n`;
  return runScript(shellSyntaxCommand, headless);
};

export const runScript = (script: string, headless = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    const shellSyntaxCommand = `${script}\n`;

    const shell = !headless
      ? spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' })
      : spawn('sh', ['-c', shellSyntaxCommand]);

    const errors: string[] = [];
    shell.stderr && shell.stderr.on('data', (data) => errors.push(data.toString()));

    shell.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(errors.join('\n')));
      }
    });
  });
};

export const wrapPromiseTest = <T>(testPromise: Promise<T>, done: Mocha.Done, callback?: (result: T) => void): void => {
  testPromise
    .then((result) => {
      if (callback) {
        callback(result);
      } else {
        done();
      }
    })
    .catch(done);
};
