import { spawn, ChildProcess } from 'child_process';
import { PassThrough } from 'stream';
import * as psTree from 'ps-tree';

export const runScript = (script: string, headless = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    const shellSyntaxCommand = `${script}\n`;

    const shell = !headless
      ? spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' }) // user interactive
      : spawn('sh', ['-c', shellSyntaxCommand]); // headless

    const errors: string[] = [];
    shell.stderr && shell.stderr.on('data', (data) => errors.push(data.toString()));

    shell.stdout && shell.stdout.on('data', (data) => {
      if (!headless) {
        process.stdout.write(data);
      }
    });

    shell.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(errors.join('\n')));
      }
    });
  });
};

export const runInSeparateProcess = (script: string, waitForCondition: (data: string) => Promise<boolean>, headless = true): Promise<ChildProcess | null> => {
  let isResolved: boolean = false;
  return new Promise((resolve, reject) => {
    const shellSyntaxCommand = `${script}\n`;

    const stdout = new PassThrough();
    const stderr = new PassThrough();

    const shell = !headless
      ? spawn('sh', ['-c', shellSyntaxCommand], { stdio: [ 'inherit', 'pipe', 'pipe' ] }) // user interactive
      : spawn('sh', ['-c', shellSyntaxCommand]); // headless

    shell.stdout && shell.stdout.pipe(stdout);
    shell.stderr && shell.stderr.pipe(stderr);

    const errors: string[] = [];
    stderr.on('data', (data) => errors.push(data.toString()));

    stdout.on('data', (data) => {
      if (!headless) {
        process.stdout.write(data);
      }
      waitForCondition(data.toString())
        .then((condition) => {
          if (condition && !isResolved) {
            isResolved = true;
            resolve(shell);
          }
        })
        .catch(console.warn);
    });

    shell.on('close', (code) => {
      stdout.pause();
      stderr.pause();
      if (isResolved) {
        return;
      }
      if (code === 0) {
        isResolved = true;
        resolve(null);
      } else {
        reject(new Error(errors.join('\n')));
      }
    });
  });
};

export const killProcessTree = (pid: number, signal: string = 'SIGKILL'): Promise<void> => {
  return new Promise((resolve, reject) => {
    psTree(pid, (error, children) => {
      if (error) {
        return reject(error);
      }
      const errors: string[] = [];
      [ pid ].concat(
        children.map((p) => p.PID as any)
      ).forEach((tpid) => {
        try {
          process.kill(tpid, signal);
        } catch (ex) {
          errors.push(ex.message);
        }
      });
      if (errors.length > 0) {
        return reject(errors.join('\n'));
      }
      return resolve();
    });
  });
};
