import * as Generator from 'yeoman-generator';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as colors from 'colors';
import { exec } from 'child_process';

export interface IUtilsSettings {
  yo: Generator;
}

export class Utils {

  private settings: IUtilsSettings;
  private destinationRoot: string;
  // private destinationPath: string;

  constructor(settings: IUtilsSettings) {
    this.settings = {
      ...settings
    };
    this.destinationRoot = this.settings.yo.destinationRoot();
    // this.destinationPath = this.settings.yo.destinationPath();
  }

  public writeJsonAsModuleSync(relativePath: string, jsonData: any) {
    const absolutePath: string = this.resolveDestPath(relativePath);
    const destinationFolder: string = path.dirname(absolutePath);
    mkdirp.sync(destinationFolder);

    const exists = fs.existsSync(absolutePath);
    if (!exists) {
      fs.writeFileSync(
        absolutePath,
        `module.exports = ${JSON.stringify(jsonData, null, 4)};\n`,
        { encoding: 'utf8' }
      );
    } else {
      this.logFileExistsMessage(absolutePath);
    }
  }

  public writeJsonSync(relativePath: string, jsonData: any, force: boolean = false) {
    const absolutePath: string = this.resolveDestPath(relativePath);
    const destinationFolder: string = path.dirname(absolutePath);
    mkdirp.sync(destinationFolder);

    const exists = fs.existsSync(absolutePath);
    if (!exists || force) {
      fs.writeFileSync(absolutePath, JSON.stringify(jsonData, null, 2), { encoding: 'utf8' });
    } else {
      this.logFileExistsMessage(absolutePath);
    }
  }

  public copyFile(sourceRelativePath: string, destRelativePath?: string | null, force: boolean = false) {
    if (typeof destRelativePath === 'undefined' || destRelativePath === null) {
      destRelativePath = sourceRelativePath;
    }
    const fromPath: string = this.resolveSourcePath(sourceRelativePath);
    const toPath: string = this.resolveDestPath(destRelativePath);
    const destinationFolder: string = path.dirname(toPath);

    let exists = fs.existsSync(toPath);
    if (force) {
      exists = false;
    }
    if (!exists) {
      mkdirp.sync(destinationFolder);
      fs.writeFileSync(toPath, fs.readFileSync(fromPath));
    } else {
      this.logFileExistsMessage(toPath);
    }
  }

  public createFolder(folderRelativePath: string): void {
    mkdirp.sync(this.resolveDestPath(folderRelativePath));
  }

  public copyFolder(sourceRelativePath: string, destRelativePath: string): void {
    const fromFolder: string = this.resolveSourcePath(sourceRelativePath);
    const toFolder: string = this.resolveDestPath(destRelativePath);
    this.copyRecursiveSync(fromFolder, toFolder);
  }

  // public restoreYoRc(storage: Generator.Storage): void {
  //   const yoPath = path.join(process.cwd(), './.yo-rc.json');
  //   const spppPkg = require(path.join(__dirname, '../../package.json'));
  //   if (fs.existsSync(yoPath)) {
  //     try {
  //       const rc = require(yoPath);
  //       if (rc[spppPkg.name]) {
  //         Object.keys(rc[spppPkg.name]).forEach((key) => {
  //           if (key.indexOf('conf.') !== -1) {
  //             storage.set(key, rc[spppPkg.name][key]);
  //           }
  //         });
  //         storage.save();
  //       }
  //     } catch (ex) { /**/ }
  //   }
  // }

  public resolveDestPath(relativePath: string): string {
    return path.join(this.destinationRoot, relativePath);
  }

  public resolveSourcePath(relativePath: string): string {
    return path.join(__dirname, '..', 'templates', relativePath);
  }

  public execPromise = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(stdout);
        }
      });
    });
  }

  private copyRecursiveSync(src: string, dest: string) {
    let isDirectory: boolean = false;
    const exists = fs.existsSync(src);
    if (exists) {
      const stats = exists && fs.statSync(src);
      isDirectory = exists && stats.isDirectory();
    }
    if (exists && isDirectory) {
      mkdirp.sync(dest);
      fs.readdirSync(src).forEach((childItemName) => {
        this.copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      try {
        // fs.linkSync(src, dest);
        fs.writeFileSync(dest, fs.readFileSync(src));
      } catch (ex) {
        if (ex.code === 'EEXIST') {
          this.logFileExistsMessage(dest);
        } else {
          console.log(ex.message);
        }
      }
    }
  }

  private logFileExistsMessage(filePath: string): void {
    console.log(`File already exists ${colors.red(filePath)}, copying is skipped.`);
  }

}
