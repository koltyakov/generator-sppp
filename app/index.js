"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const lodash_1 = require("lodash");
const colors = require("colors");
const yosay = require("yosay");
const child_process_1 = require("child_process");
const utils_1 = require("./scripts/utils");
const install_1 = require("./scripts/install");
const prompts_1 = require("./scripts/prompts");
const configurators = require("./scripts/configurators");
class SP extends Generator {
    constructor(args, options) {
        super(args, options);
        this.data = {};
        this.utils = new utils_1.default({
            yo: this
        });
    }
    initializing() {
        this.data.sppp = require('../package.json');
        this.log(yosay(`Welcome to ${colors.yellow('SharePoint Pull-n-Push')} generator (v.${this.data.sppp.version})!`));
        this.appname = lodash_1.kebabCase(this.appname);
        this.appname = this.appname || this.config.get('appname') || 'sharepoint-app';
        this.config.set('app.name', this.appname);
        this.config.set('sppp.version', this.data.sppp.version);
        this.config.save();
    }
    prompting() {
        const done = this.async();
        prompts_1.promptQuestions(this.data, this).then((answers) => {
            this.data.answers = Object.assign({}, this.data.answers, answers);
            done();
        });
    }
    configuring() {
        this.config.set('app.name', this.data.answers.name);
        this.config.set('app.description', this.data.answers.description);
        this.config.set('app.author', this.data.answers.author);
        this.config.set('conf.spFolder', this.data.answers.spFolder);
        this.config.set('conf.distFolder', this.data.answers.distFolder);
        this.config.save();
    }
    writing() {
        this.log(`\n${colors.yellow.bold('Writing files')}`);
        this.utils.writeJsonSync('package.json', configurators.packageJson(this.data));
        this.utils.writeJsonSync('config/app.json', configurators.configAppJson(this.data));
        this.utils.writeJsonSync('tsconfig.json', configurators.tsconfigJson(this.data));
        this.utils.writeJsonSync('tslint.json', configurators.tslintJson(this.data));
        this.utils.writeJsonAsModuleSync('.eslintrc.js', configurators.eslintJson(this.data));
        this.utils.copyFile('gulpfile.js', null, true);
        this.utils.copyFile('gitignore', '.gitignore');
        this.utils.copyFile('webpack.config.js');
        this.utils.copyFile('build/tasks/example.js');
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
    install() {
        this.log(`\n${colors.yellow.bold('Installing dependencies')}\n`);
        const done = this.async();
        child_process_1.exec('yarn --version', (err, stout, sterr) => {
            if (!err) {
                this.yarnInstall(install_1.npmDependencies.dependencies, { 'save': true });
                this.yarnInstall(install_1.npmDependencies.devDependencies, { 'save-dev': true });
            }
            else {
                this.npmInstall(install_1.npmDependencies.dependencies, { 'save': true });
                this.npmInstall(install_1.npmDependencies.devDependencies, { 'save-dev': true });
            }
            done();
        });
    }
    end() {
        this.log(`\n${colors.yellow.bold('Installation successful!')}`);
    }
}
module.exports = SP;
