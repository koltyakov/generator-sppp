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
  }]); // as Promise<IAnswers>;
};

export const promptAdditionalQuestions = (_data: IGeneratorData, yo: Generator): Promise<IAnswers> => {
  // Step 2: Additional questions
  return yo.prompt([
    {
      type: 'confirm',
      name: 'additional.sslCerts',
      message: 'Copy SSL certificates (for live reload with HTTPS)',
      default: typeof yo.config.get('conf.additional.sslCerts') === 'undefined' ? false : true
    },
    {
      type: 'confirm',
      name: 'additional.customTasks',
      message: 'Scaffold extention tasks',
      default: typeof yo.config.get('conf.additional.customTasks') === 'undefined' ? true : false
    },
    {
      type: 'checkbox',
      name: 'additional.presets',
      message: 'Apply following presets',
      choices: [
        { name: 'React', value: 'react' },
        { name: 'Office UI Fabric (includes React)', value: 'office-ui-fabric' }
      ],
      default: yo.config.get('conf.additional.presets')
    },
    // {
    //   type: 'checkbox',
    //   name: 'additional.confPresets',
    //   message: 'Apply following config presets',
    //   choices: [
    //     { name: 'ESLint', value: 'eslint' },
    //     { name: 'Prettier', value: 'prettier' },
    //     { name: 'Editor Config', value: 'editorconfig' }
    //   ],
    //   default: yo.config.get('conf.additional.confPresets')
    // }
  ]); // as Promise<IAnswers>;
};
