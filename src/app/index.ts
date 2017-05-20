import * as Generator from 'yeoman-generator';
import { kebabCase } from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import * as colors from 'colors';
import * as yosay from 'yosay';
import { exec } from 'child_process';

import Utils from './scripts/utils';
import { npmDependencies } from './scripts/install';
import { promptQuestions } from './scripts/prompts';
import * as configurators from './scripts/configurators';
import { IGeneratorData, IAppConf, IAnswers } from './scripts/interfaces';

class SP extends Generator {

    private data: IGeneratorData = {};
    private utils: Utils;

    constructor(args: string | string[], options: any) {
        super(args, options);
        this.utils = new Utils({
            yo: this
        });
    }

    private initializing() {
        this.data.sppp = require('../../package.json');

        this.log(yosay(`Welcome to ${
            colors.yellow('SharePoint Pull-n-Push')
        } generator (v.${this.data.sppp.version})!`));

        this.appname = kebabCase(this.appname);
        this.appname = this.appname || this.config.get('appname') || 'sharepoint-app';

        this.config.set('app.name', this.appname);
        this.config.set('sppp.version', this.data.sppp.version);
        this.config.save();
    }

    private prompting() {
        const done = (this as any).async();
        promptQuestions(this.data, this).then((answers) => {
            this.data.answers = {
                ...this.data.answers,
                ...answers
            };
            done();
        });
    }

    private configuring() {
        this.config.set('app.name', this.data.answers.name);
        this.config.set('app.description', this.data.answers.description);
        this.config.set('app.author', this.data.answers.author);
        this.config.set('conf.spFolder', this.data.answers.spFolder);
        this.config.set('conf.distFolder', this.data.answers.distFolder);
        this.config.save();
    }

    private writing() {
        this.log(`\n${
            colors.yellow.bold('Writing files')
        }`);

        this.utils.writeJsonSync('package.json', configurators.packageJson(this.data));
        this.utils.writeJsonSync('config/app.json', configurators.configAppJson(this.data));

        this.utils.writeJsonSync('tsconfig.json', configurators.tsconfigJson(this.data));
        this.utils.writeJsonSync('tslint.json', configurators.tslintJson(this.data));

        this.utils.writeJsonAsModuleSync('.eslintrc.js', configurators.eslintJson(this.data));

        this.utils.copyFile('gulpfile.js');
        this.utils.copyFile('gitignore', '.gitignore');
        this.utils.copyFile('webpack.config.js');

        this.utils.createFolder('src/scripts');
        this.utils.createFolder('src/libs');
        this.utils.createFolder('src/styles');
        this.utils.createFolder('src/fonts');
        this.utils.createFolder('src/images');
        this.utils.createFolder('src/masterpage/layouts');
        this.utils.createFolder('src/webparts');

        this.utils.copyFolder('src', 'src');
        this.utils.copyFolder('config/ssl', 'config/ssl');
    }

    private install() {
        this.log(`\n${
            colors.yellow.bold('Installing dependencies')
        }\n`);
        const done = (this as any).async();

        exec('yarn --version', (err, stout, sterr) => {
            if (!err) {
                this.yarnInstall(npmDependencies.dependencies, { 'save': true });
                this.yarnInstall(npmDependencies.devDependencies, { 'save-dev': true });
            } else {
                this.npmInstall(npmDependencies.dependencies, { 'save': true });
                this.npmInstall(npmDependencies.devDependencies, { 'save-dev': true });
            }
            done();
        });
    }

    private end() {
        this.log(`\n${
            colors.yellow.bold('Installation successful!')
        }`);
    }

}

module.exports = SP;
