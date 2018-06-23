import { IPackageJsonMetadata, IGeneratorData, IAppConfig } from './interfaces';

export const packageJson = (metadata: IGeneratorData) => {
  const data: IPackageJsonMetadata = {
    ...(metadata.answers as IPackageJsonMetadata),
    version: metadata.answers.version || '1.0.0',
    license: metadata.answers.license || 'MIT'
  };
  return {
    name: data.name,
    version: data.version,
    description: data.description,
    main: './dist/index.js',
    private: true,
    scripts: {
      build: 'gulp build --prod',
      watch: 'gulp watch',
      config: 'gulp config --init',
      publish: 'gulp push --diff',
      analyze: 'gulp analyze'
    },
    author: data.author,
    license: data.license,
    dependencies: {},
    devDependencies: {}
  };
};

export const configAppJson = (metadata: IGeneratorData): IAppConfig => {
  const appConf: IAppConfig | any = {
    $schema: '../node_modules/sp-build-tasks/schema/v1/sppp.json',
    spFolder: metadata.answers.spFolder,
    distFolder: metadata.answers.distFolder
  };
  return appConf;
};

export const tsconfigJson = (_metadata?: IGeneratorData) => {
  return {
    compilerOptions: {
      target: 'es5',
      module: 'esnext',
      lib: [
        'es2017',
        'dom'
      ],
      rootDir: 'src',
      jsx: 'react',
      sourceMap: true,
      declaration: true,
      moduleResolution: 'node',
      noImplicitAny: false,
      removeComments: true,
      experimentalDecorators: true,
      skipLibCheck: true,
      types: [
        'node',
        'sharepoint'
      ],
      outDir: 'tmp'
    },
    exclude: [
      'node_modules',
      'webpack.config.js',
      'gulpfile.js',
      'build',
      'dist',
      'tmp',
      'cache'
    ]
  };
};

export const tslintJson = (_metadata?: IGeneratorData) => {
  return {
    extends: 'tslint-config-standard',
    rules: {
      semicolon: [ true, 'always', 'ignore-interfaces' ],
      'space-before-function-paren': false
    }
  };
};

export const eslintJson = (_metadata?: IGeneratorData) => {
  return {
    extends: 'standard',
    ecmaVersion: 6,
    installedESLint: true,
    plugins: [
      'standard',
      'promise'
    ]
  };
};
