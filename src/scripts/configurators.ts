import { IPackageJsonMetadata, IGeneratorData, IAppConf } from './interfaces';

export const packageJson = (metadata: IGeneratorData) => {
  let data: IPackageJsonMetadata = {
    ...(metadata.answers as IPackageJsonMetadata),
    version: metadata.answers.version || '1.0.0',
    license: metadata.answers.license || 'MIT'
  };
  return {
    name: data.name,
    version: data.version,
    description: data.description,
    main: './dist/index.js',
    scripts: {},
    author: data.author,
    license: data.license,
    dependencies: {},
    devDependencies: {}
  };
};

export const configAppJson = (metadata: IGeneratorData) => {
  let appConf: IAppConf = {
    $schema: '../node_modules/sp-build-tasks/schema/v1/sppp.json',
    spFolder: metadata.answers.spFolder,
    distFolder: metadata.answers.distFolder
  };
  return appConf;
};

export const tsconfigJson = (metadata?: IGeneratorData) => {
  return {
    compilerOptions: {
      target: 'es5',
      module: 'commonjs',
      lib: ['es2017', 'dom'],
      sourceMap: true,
      declaration: true,
      moduleResolution: 'node',
      noImplicitAny: false,
      removeComments: true,
      types: [
        'node'
      ],
      outDir: './tmp'
    }
  };
};

export const tslintJson = (metadata?: IGeneratorData) => {
  return {
    extends: 'tslint-config-standard',
    rules: {
      semicolon: [true, 'always', 'ignore-interfaces']
    }
  };
};

export const eslintJson = (metadata?: IGeneratorData) => {
  return {
    extends: 'standard',
    ecmaVersion: 6,
    installedESLint: true,
    plugins: [
      'standard',
      'promise'
    ],
    indent: ['error', 2]
  };
};
