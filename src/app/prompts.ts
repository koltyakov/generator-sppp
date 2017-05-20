import * as Promise from 'bluebird';
import * as Generator from 'yeoman-generator';
import { kebabCase } from 'lodash';

import { IAnswers } from './interfaces';

export const promptQuestions = (data: any, yo: Generator): Promise<any> => {
    return new Promise((resolve, reject) => {
        let allAnswers: IAnswers;

        // Step 1: General parameters
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
                allAnswers = {
                    ...(allAnswers || {}) as IAnswers,
                    ...answers
                };

                resolve(allAnswers);
            });

    });
};
