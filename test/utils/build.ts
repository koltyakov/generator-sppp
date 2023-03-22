import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';

import { runScript } from './process';

export const initFolder = (rootFolder: string, projName: string, rcFilePath = './.yo-rc.json') => {
  const projFolder = path.join(rootFolder, `./tmp/${projName}`);
  rimraf.sync(projFolder);
  mkdirp.sync(projFolder);
  fs.copyFileSync(path.join(rootFolder, rcFilePath), path.join(projFolder, '.yo-rc.json'));

  // Copy private.json if exists (for local testing scenarios, use `npm run connect` to create private.json)
  const privateJson = path.join(process.cwd(), './config/private.json');
  try {
    if (fs.statSync(privateJson).isFile()) {
      mkdirp.sync(path.join(projFolder, './config'));
      fs.copyFileSync(privateJson, path.join(projFolder, './config/private.json'));
    }
  } catch (ex) { /**/ }
};

export const runGenerator = (rootFolder: string, projName: string, headless = false, skipInstall = false, skipBuild = false): Promise<void> => {
  const projFolder = path.join(rootFolder, `./tmp/${projName}`);

  const relRootPath = path.relative(projFolder, process.cwd()).replace(/\\/g, '/');
  const cdToPath = path.relative(process.cwd(), projFolder).replace(/\\/g, '/');

  let shellSyntaxCommand = `cd ${cdToPath} && npx yo ${relRootPath}`;
  shellSyntaxCommand += headless ? ` --headless` : ``;
  shellSyntaxCommand += skipInstall ? ` --skip-npm-install` : ``;
  shellSyntaxCommand += skipBuild ? '\n' : ' && npm run build\n';

  return runScript(shellSyntaxCommand, headless);
};

export const runNpmInstall = (rootFolder: string, projectName: string, headless = false): Promise<void> => {
  const projFolder = path.join(rootFolder, `./tmp/${projectName}`);
  const cdToPath = path.relative(process.cwd(), projFolder).replace(/\\/g, '/');
  const shellSyntaxCommand = `cd ${cdToPath} && npm install\n`;
  return runScript(shellSyntaxCommand, headless);
};

export const runBuild = (rootFolder: string, projectName: string, headless = false): Promise<void> => {
  const projFolder = path.join(rootFolder, `./tmp/${projectName}`);
  const cdToPath = path.relative(process.cwd(), projFolder).replace(/\\/g, '/');
  const shellSyntaxCommand = `cd ${cdToPath} && npm run build\n`;
  return runScript(shellSyntaxCommand, headless);
};

export const checkDeps = (rootFolder: string, projectName: string, requiredDeps: string[], dev = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    const projFolder = path.join(rootFolder, `./tmp/${projectName}`);
    const pkg = require(path.join(projFolder, 'package.json'));
    const pkgDeps = dev ? pkg.devDependencies : pkg.dependencies || {};
    const missedDeps = requiredDeps.filter((d) => typeof pkgDeps[d] === 'undefined');
    if (missedDeps.length > 0) {
      return reject(new Error(`Some dependencies are missed: ${missedDeps.join(', ')}`));
    }
    return resolve();
  });
};
