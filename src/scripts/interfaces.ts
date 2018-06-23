export { IAppConfig } from 'sp-build-tasks';

export interface IKeyVal {
  [key: string]: any;
}

export interface IGeneratorMetadata {
  version: string;
}

export interface IPackageJsonMetadata {
  name: string;
  version?: string;
  description?: string;
  author?: string;
  license?: string;
}

export interface IGeneratorData {
  sppp?: IGeneratorMetadata;
  answers?: IAnswers;
}

export interface IAnswers {
  name: string;
  description: string;
  author: string;
  spFolder: string;
  distFolder: string;
  version?: string;
  license?: string;
}
