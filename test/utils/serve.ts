import * as path from 'path';

import { runInSeparateProcess, killProcessTree } from './process';

export interface IServeProps {
  rootFolder: string;
  projName: string;
  browserTests: () => Promise<void>;
  headless?: boolean;
  timeout?: number;
  mochaContext?: Mocha.Context;
}

export const serve = async (props: IServeProps): Promise<void> => {
  const projFolder = path.join(props.rootFolder, `./tmp/${props.projName}`);
  const cdToPath = path.relative(process.cwd(), projFolder).replace(/\\/g, '/');
  const command = `cd ${cdToPath} && npm run start`;

  const shell = await runInSeparateProcess(
    command,
    (data: string): Promise<{ skip: boolean; stop: boolean; }> => {
      if (data.indexOf(': Compiled successfully.') !== -1) {
        return Promise.resolve({ skip: true, stop: false });
      }
      if (data.indexOf(': Compiled with warnings.') !== -1) {
        return Promise.resolve({ skip: true, stop: false });
      }
      // Skip if creds are prompted
      if (data.indexOf('SharePoint URL (') !== -1) {
        if (props.mochaContext) {
          return Promise.resolve({ skip: true, stop: true });
        }
        return Promise.reject(new Error('No auth context found'));
      }
      return Promise.resolve({ skip: false, stop: false });
    },
    typeof props.headless !== 'undefined' ? props.headless : true,
    props.timeout
  );
  if (shell === null) {
    return props.mochaContext?.skip();
  }
  const testResults = await props.browserTests().catch((error) => error);
  await killProcessTree(shell.pid);
  if (testResults) {
    throw new Error(testResults);
  }
};
