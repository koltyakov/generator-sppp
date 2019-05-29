import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';

import { runScript } from './process';

export const initFolder = (rootFolder: string, projName: string, rcFilePath = './.yo-rc.json') => {
  const projFolder = path.join(rootFolder, `./tmp/${projName}`);
  rimraf.sync(projFolder);
  mkdirp.sync(projFolder);
  // fs.mkdirSync(projFolder, { recursive: true });
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
