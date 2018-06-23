import * as Generator from 'yeoman-generator';

import { IAnswers, IGeneratorData } from './interfaces';

export const promptQuestions = (_data: IGeneratorData, yo: Generator): Promise<IAnswers> => {
  // Step 1: General parameters
  return yo.prompt([{
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
  }]) as Promise<IAnswers>;
};
