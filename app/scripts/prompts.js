"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("bluebird");
exports.promptQuestions = (data, yo) => {
    return new Promise((resolve, reject) => {
        let allAnswers;
        yo.prompt([{
                type: 'input',
                name: 'name',
                message: 'Application Name',
                default: yo.config.get('app.name')
            }, {
                type: 'input',
                name: 'description',
                message: 'Description',
                default: yo.config.get('app.description')
            }, {
                type: 'input',
                name: 'author',
                message: 'Author',
                default: yo.config.get('app.author')
            }, {
                type: 'input',
                name: 'spFolder',
                message: 'Publish Folder',
                default: yo.config.get('conf.spFolder') || '_catalogs/masterpage/spf'
            }, {
                type: 'input',
                name: 'distFolder',
                message: 'Distribution Folder',
                default: yo.config.get('conf.distFolder') || './dist'
            }])
            .then((answers) => {
            allAnswers = Object.assign({}, (allAnswers || {}), answers);
            resolve(allAnswers);
        });
    });
};
