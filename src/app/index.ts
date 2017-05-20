import * as Generator from 'yeoman-generator';
import { kebabCase } from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import * as colors from 'colors';
import * as yosay from 'yosay';

import Utils from './utils';
import { npmDependencies } from './install';
import { promptQuestions } from './prompts';
import { createPackageJson, createAppJson } from './configurators';
import { IGeneratorData, IAppConf, IAnswers } from './interfaces';

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
        } generator (v. ${this.data.sppp.version})!`));

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
        this.config.set('app.description', this.data.answers.name);
        this.config.set('app.author', this.data.answers.name);
        this.config.set('conf.spFolder', this.data.answers.spFolder);
        this.config.set('conf.distFolder', this.data.answers.distFolder);
        this.config.save();
    }

    private writing() {
        this.log(`\n${
            colors.yellow.bold('Writing files')
        }`);

        this.utils.writeJsonSync('package.json', createPackageJson(this.data));
        this.utils.writeJsonSync('config/app.json', createAppJson(this.data));

        this.utils.copyFile('_gulpfile.js', 'gulpfile.js');
        this.utils.copyFile('gitignore', '.gitignore');

        this.utils.createFolder('src');

        this.utils.copyFolder('ssl', 'config/ssl');
    }

    private install() {
        this.log(`\n${
            colors.yellow.bold('Installing dependencies')
        }`);
        this.yarnInstall(npmDependencies.dependencies, { 'save': true });
        this.yarnInstall(npmDependencies.devDependencies, { 'save-dev': true });
    }

    private end() {
        this.log(`\n${
            colors.yellow.bold('Installation successful!')
        }`);
    }

}

module.exports = SP;
