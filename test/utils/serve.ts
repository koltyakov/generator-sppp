import * as path from 'path';

import { runInSeparateProcess, killProcessTree } from './process';

export interface IServeProps {
  rootFolder: string;
  projName: string;
  browserTests: () => Promise<void>;
  headless?: boolean;
}

export const serve = (props: IServeProps): Promise<void> => {
  const projFolder = path.join(props.rootFolder, `./tmp/${props.projName}`);
  const cdToPath = path.relative(process.cwd(), projFolder).replace(/\\/g, '/');
  const command = `cd ${cdToPath} && npm run start`;

  return runInSeparateProcess(
    command,
    (data) => {
      if (data.indexOf(': Compiled successfully.') !== -1) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
    typeof props.headless !== 'undefined' ? props.headless : true
  )
    .then((shell) => {
      return Promise.all([
        props.browserTests().catch((error) => error),
        shell
      ]);
    })
    .then(([ testResults, shell ]) => {
      return Promise.all([
        testResults,
        shell ? killProcessTree(shell.pid) : null
      ]);
    })
    .then(([ testResults ]) => {
      if (testResults) {
        throw new Error(testResults);
      }
    });
};
