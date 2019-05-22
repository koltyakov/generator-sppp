import * as Generator from 'yeoman-generator';
import { kebabCase } from 'lodash';
import * as fs from 'fs';
import * as colors from 'colors';
import * as yosay from 'yosay';
import * as dargs from 'dargs';

import { Utils } from './scripts/utils';
import { npmDependencies, presetDependencies } from './scripts/install';
import { promptQuestions, promptAdditionalQuestions } from './scripts/prompts';
import * as configurators from './scripts/configs';

import { IGeneratorData, IAppConfig } from './scripts/interfaces';

module.exports = class extends Generator {

  private data: IGeneratorData = {};
  private utils: Utils;

  private packageData: any;
  private existingProject: boolean = false;
  private isAngularProject: boolean = false;
  private headless: boolean;

  constructor(args, options) {
    super(args, options);
    this.utils = new Utils({ yo: this });
    this.headless = process.argv.slice(2).indexOf('--headless') !== -1;
    // Custom options
    this.option('package-manager', {
      description: 'preferred package manager (npm, yarn, pnpm)',
      type: String,
      alias: 'pm',
      default: 'npm'
    });
  }

  public initializing() {
    this.data.sppp = require('../package.json');

    const spppVersion = this.data && this.data.sppp && this.data.sppp.version || 'unknown';

    this.log(yosay(`Welcome to ${colors.yellow('SharePoint Pull-n-Push')} generator (v.${spppVersion})!`));

    this.appname = kebabCase(this.appname);
    this.appname = this.appname || this.config.get('appname') || 'sharepoint-app';

    this.config.set('app.name', this.appname);
    this.config.set('sppp.version', spppVersion);
    this.config.save();

    // Check for existing project
    (() => {
      const packagePath: string = this.utils.resolveDestPath('package.json');
      if (fs.existsSync(packagePath)) {
        this.existingProject = true;
        this.packageData = require(packagePath);
      }
      const angularCliPath: string = this.utils.resolveDestPath('.angular-cli.json');
      if (fs.existsSync(angularCliPath)) {
        this.log(`\n${
          colors.yellow.bold('Angular project is detected, SPPP will be installed above safely.\n')
          }`);
        this.isAngularProject = true;
      }
    })();

  }

  public prompting() {
    const done = (this as any).async();
    if (this.headless) {
      return done();
    }
    (async () => {
      // Step 1: General parameters
      await promptQuestions(this.data, this).then(answers => {
        this.data.answers = { ...this.data.answers, ...answers };
      });
      // Step 2: Additional questions
      await promptAdditionalQuestions(this.data, this).then(answers => {
        if (answers.additional) {
          let presets = answers.additional.presets || [];
          if (presets.indexOf('office-ui-fabric') !== -1 && presets.indexOf('react') === -1) {
            presets = [ 'react', ...presets ];
          }
          answers.additional = {
            ...answers.additional,
            presets
          };
        }
        this.data.answers = {
          ...this.data.answers,
          ...answers
        };
      });
      done();
    })().catch(error => this.log(`\n${colors.red.bold(error.message)}\n`));
  }

  public configuring() {
    this.config.set('app.name', this.data.answers && this.data.answers.name);
    this.config.set('app.description', this.data.answers && this.data.answers.description);
    this.config.set('app.author', this.data.answers && this.data.answers.author);
    this.config.set('conf.spFolder', this.data.answers && this.data.answers.spFolder);
    this.config.set('conf.distFolder', this.data.answers && this.data.answers.distFolder);
    const additional = this.data.answers && this.data.answers.additional ? this.data.answers.additional : [];
    Object.keys(additional).forEach(key => {
      this.config.set(`conf.additional.${key}`, additional[key]);
    });
    this.config.save();
  }

  public writing() {
    this.log(`\n${
      colors.yellow.bold('Writing files')
    }`);

    if (!this.existingProject) {
      this.utils.writeJsonSync('package.json', configurators.packageJson(this.data));
    }

    let appJson: IAppConfig = configurators.configAppJson(this.data);
    if (this.data.answers && this.data.answers.additional
      && this.data.answers.additional.presets.indexOf('react') !== -1) {
      appJson.copyAssetsMap = [
        ...appJson.copyAssetsMap || [], {
          name: 'React',
          src: [
            './node_modules/react/umd/react.production.min.js',
            './node_modules/react-dom/umd/react-dom.production.min.js'
          ],
          dist: './dist/libs'
        }
      ];
      // const webpackAppItem = (appJson.webpackItemsMap || []).filter(item => item.name === 'Application');
      // if (webpackAppItem.length === 1) {
      //   webpackAppItem[0].name += 'x';
      // }
    }
    this.utils.writeJsonSync('config/app.json', appJson);

    this.utils.writeJsonSync('tsconfig.json', configurators.tsconfigJson(this.data));
    this.utils.writeJsonSync('tslint.json', configurators.tslintJson(this.data));

    this.utils.copyFile('gulpfile.js', null, true);
    this.utils.copyFile('gitignore', '.gitignore');
    this.utils.copyFile('env', '.env');
    this.utils.copyFile('webpack.config.js');

    if (this.data.answers && this.data.answers.additional
      && this.data.answers.additional.customTasks) {
      this.utils.copyFile('tools/tasks/example.js');
      this.utils.copyFile('tools/tasks/customDataLoader.js');
    }

    // Ignore folder structure for Angular project
    if (!this.isAngularProject) {
      this.utils.createFolder('src/scripts');
      this.utils.createFolder('src/libs');
      this.utils.createFolder('src/styles');
      this.utils.createFolder('src/fonts');
      this.utils.createFolder('src/images');
      this.utils.createFolder('src/masterpage/layouts');
      this.utils.createFolder('src/webparts');
      this.utils.createFolder('dist');
      this.utils.copyFolder('src', 'src');
      if (this.data.answers && this.data.answers.additional) {
        const presets = this.data.answers.additional.presets;
        if (presets.indexOf('react') !== -1) {
          this.utils.copyFolder('presets/react', 'src');
        }
        if (presets.indexOf('eslint') !== -1) {
          // this.utils.copyFolder('presets/eslint', 'src');
          this.utils.writeJsonSync('.eslintrc', configurators.eslintJson(this.data));
        }
        if (presets.indexOf('prettier') !== -1) {
          this.utils.writeJsonSync('.prettierrc', configurators.prettierJson(this.data));
        }
        if (presets.indexOf('editorconfig') !== -1) {
          this.utils.copyFile('editorconfig', '.editorconfig');
        }
      }
    }

    this.utils.copyFolder('vscode', '.vscode');

    if (this.data.answers && this.data.answers.additional
      && this.data.answers.additional.sslCerts) {
      this.utils.copyFolder('config/ssl', 'config/ssl');
    }

    this.log(`${colors.green('Done writing')}`);
  }

  public install() {
    this.log(`\n${colors.yellow.bold('Installing dependencies')}\n`);
    const done = (this as any).async();

    if (this.isAngularProject) {
      // Add dependency for Angular project
      npmDependencies.devDependencies.push('concurrently');
      // Add angular tasks
      this.packageData.scripts.spdev = 'concurrently --kill-others \"ng build --watch\" \"gulp watch\"';
      this.utils.writeJsonSync('package.json', this.packageData, true);
    }

    (async () => {
      let next = true;
      let installer: any = null;
      let depOptions: any = null;
      let devDepOptions: any = null;

      depOptions = { 'save': true };

      if (this.options['package-manager'] === 'pnpm') {
        next && await this.utils.execPromise('pnpm --version').then(_ => {
          installer = (dep: string[], opt) => {
            const args = ['install'].concat(dep).concat(dargs(opt));
            this.spawnCommandSync('pnpm', args);
          };
          devDepOptions = { 'save-dev': true };
          next = false;
        }).catch(_ => next = true);
      }

      if (this.options['package-manager'] === 'yarn') {
        next && await this.utils.execPromise('yarn --version').then(_ => {
          installer = this.yarnInstall.bind(this);
          devDepOptions = { 'dev': true };
          next = false;
        }).catch(_ => next = true);
      }

      next && (() => {
        installer = this.npmInstall.bind(this);
        devDepOptions = { 'save-dev': true };
      })();

      let dependencies = npmDependencies.dependencies;
      let devDependencies = npmDependencies.devDependencies;

      this.data.answers && this.data.answers.additional && this.data.answers.additional.presets.forEach(preset => {
        if (typeof presetDependencies[preset] !== 'undefined') {
          const { dependencies: dep, devDependencies: devDep } = presetDependencies[preset];
          if (dep) {
            dependencies = [ ...dependencies, ...dep ];
          }
          if (devDep) {
            devDependencies = [ ...devDependencies, ...devDep ];
          }
        }
      });

      installer(dependencies, depOptions);
      installer(devDependencies, devDepOptions);

      done();
    })()
      .catch(error => {
        this.log(`\n${colors.red.bold(error.message)}\n`);
      });
  }

  public end() {
    this.log(`\n${colors.yellow.bold('Installation successful!')}`);
    this.log(`\n${colors.gray(`Run \`${colors.blue.bold('npm run config')}\` to configure SharePoint connection.`)}`);
  }

};
