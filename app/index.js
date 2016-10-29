'use strict';

var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');
var _ = require('lodash');
var colors = require('colors');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    constructor: function() {
        yeoman.Base.apply(this, arguments);

        this.argument('appname', { type: String, required: false });
        this.appname = _.kebabCase(this.appname);
        // this.appname = _.camelCase(this.appname);
        this.appname = this.appname || this.config.get('appname') || 'sp-app';
        this.config.set('appname', this.appname);
        this.config.save();

        this.settings = {
            appname: this.appname
        };
    },
    initializing: function() {
        this.log(
            yosay(
                'Welcome to ' +
                colors.yellow('SPPP (SharePoint Pull-n-Push)') +
                ' generator!'
            )
        );
        this.bowerlibs = require('./bowerlibs');
    },
    prompting: {
        app: function() {
            var prompts = (function() {
                return [{
                    type: 'input',
                    name: 'appname',
                    message: 'SharePoint App Name',
                    default: this.config.get('appname') || 'sp-app'
                }, {
                    type: 'input',
                    name: 'appdesc',
                    message: 'Description',
                    default: this.config.get('appdesc') || null
                }, {
                    type: 'input',
                    name: 'author',
                    message: 'Author',
                    default: this.config.get('author') || null
                }];
            }.bind(this))();

            return this.prompt(prompts).then(function (answers) {
                this.appname = answers.appname = _.kebabCase(answers.appname);
                _.assignIn(this.settings, answers);
            }.bind(this));
        },
        tenant: function() {
            var prompts = (function() {
                return [{
                    type: 'input',
                    name: 'siteUrl',
                    message: 'SharePoint Site Url',
                    default: this.config.get('siteUrl') || 'https://contoso.sharepoint.com'
                }];
            }.bind(this))();

            return this.prompt(prompts).then(function (answers) {
                _.assignIn(this.settings, answers);
            }.bind(this));
        },
        auth: function() {
            var prompts = (function() {
                var promptFor = [];
                if (this.settings.siteUrl.indexOf(".sharepoint.com") === -1) {
                    promptFor.push({
                        type: 'input',
                        name: 'domain',
                        message: 'Domain', //  (only for On-Premises)
                        default: this.config.get('domain') || null
                    });
                }
                promptFor.push({
                    type: 'input',
                    name: 'username',
                    message: 'SharePoint User Name',
                    default: this.config.get('username') || 'username'
                });
                promptFor.push({
                    type: 'password',
                    name: 'password',
                    message: 'SharePoint User Password'
                });
                return promptFor;
            }.bind(this))();

            return this.prompt(prompts).then(function (answers) {
                var Cpass = require("cpass");
                var cpass = new Cpass();
                answers.password = cpass.encode(answers.password);
                _.assignIn(this.settings, answers);
                console.log("For advanced auth scenarious please check 'Communication layer settings'");
                console.log("section at https://github.com/koltyakov/generator-sppp");
            }.bind(this));
        },
        mapping: function() {
            var prompts = (function() {
                return [{
                    type: 'input',
                    name: 'spRootFolder',
                    message: 'SharePoint Root Folder',
                    default: this.config.get('spRootFolder') || '_catalogs/masterpage/spf'
                }, {
                    type: 'input',
                    name: 'dlRootFolder',
                    message: 'Project Sync Folder',
                    default: this.config.get('dlRootFolder') || './src'
                }];
            }.bind(this))();

            return this.prompt(prompts).then(function (answers) {
                _.assignIn(this.settings, answers);
            }.bind(this));
        },
        dependencies: function() {
            var prompts = (function() {
                return [{
                    type: 'checkbox',
                    name: 'bowerlibs',
                    message: 'Which libraries would you like to include?',
                    choices: this.bowerlibs.map(function(lib) {
                        return {
                            name: lib.name,
                            value: lib.value,
                            checked: (this.config.get('bowerlibs') || []).indexOf(lib.value) !== -1 ? true : false
                        };
                    }.bind(this))
                }];
            }.bind(this))();

            return this.prompt(prompts).then(function (answers) {
                _.assignIn(this.settings, answers);
            }.bind(this));
        }
    },
    configuring: function() {
        for (var prop in this.settings) {
            if (this.settings.hasOwnProperty(prop) && prop !== 'password') {
                this.config.set(prop, this.settings[prop]);
            }
        }
        this.config.save();

        this.privateConf = {};
        this.privateConf.siteUrl = this.settings.siteUrl;
        this.privateConf.username = this.settings.username;
        this.privateConf.password = this.settings.password;
        if (typeof this.settings.domain !== 'undefined' && this.settings.domain.length > 0) {
            this.privateConf.domain = this.settings.domain;
        }

        this.appConf = {
            spRootFolder: this.settings.spRootFolder,
            dlRootFolder: this.settings.dlRootFolder
        };

    },
    default: function() {
    },
    writing: {
        configs: function() {
            this.fs.writeJSON('config/_private.conf.json', this.privateConf);
            this.fs.writeJSON('config/app.conf.json', this.appConf);
        },
        emptyFolderStructure: function() {
            mkdirp.sync(path.join(this.destinationPath(), 'src'));
        },
        gulpfile: function() {
            this.copy('_gulpfile.js', 'gulpfile.js');
            this.copy('_gulp.config.js', 'gulp.config.js');
        },
        eslintrc: function() {
            // this.copy('_.eslintrc.js', '.eslintrc.js');
        },
        packageJson: function() {
            var pakageJSON = {
                name: this.settings.appname,
                version: '1.0.0',
                description: this.settings.appdesc,
                main: 'index.js',
                scripts: {
                    test: 'echo \"Error: no test specified\" && exit 1'
                },
                author: this.settings.author,
                license: 'MIT',
                dependencies: {},
                devDependencies: {}
            };

            pakageJSON.devDependencies['gulp'] = '*';
            pakageJSON.devDependencies['gulp-spsave'] = '*';
            pakageJSON.devDependencies['gulp-watch'] = '*';
            pakageJSON.devDependencies['gulp-prompt'] = '*';
            pakageJSON.devDependencies['sppull'] = '*';
            pakageJSON.devDependencies['cpass'] = '*';
            pakageJSON.devDependencies['jsonfile'] = '*';

            this.fs.writeJSON('package.json', pakageJSON);
        },
        git: function() {
            this.copy('gitignore', '.gitignore');
        },
        bowerrc: function() {
            this.copy('bowerrc', '.bowerrc');
        },
        bowerJson: function() {
            var bowerJSON = {
                name: this.settings.appname,
                license: 'MIT',
                dependencies: {}
            };
            this.settings.bowerlibs.forEach(function(d) {
                bowerJSON.dependencies[d] = this.bowerlibs.filter(function(l) {
                    return l.value === d;
                })[0].version;
            }.bind(this));
            this.fs.writeJSON('bower.json', bowerJSON);
        },
        appStaticFiles: function() {
            // Copy specific file
            // this.copy('_app.js', 'src/app.js');

            // Copy content from source folder to target one
            // this.directory('from_templates', 'to_local_assets');
        },
        scripts: function() {
        },
        html: function() {
            // Template copy
            /*
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('src/index.html'), {
                    prop: 'val'
                }
            );
            // <%= prop %> - in template
            */
        }
    },
    conflicts: function() {
    },
    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },
    end: function() {
        this.log(colors.yellow.bold('Installation successful!'));

        var howToInstall = '\nDon\'t forget to run ' +
                           colors.yellow.bold('npm install & bower install') +
                           ' to complete project scaffolding.';

        if (this.options['skip-install']) {
            this.log(howToInstall);
            return;
        }
    }
});