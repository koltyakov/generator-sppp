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
    scripts: {
      build: 'gulp build',
      watch: 'gulp watch',
      config: 'gulp config:force',
      publish: 'gulp push:diff'
    },
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
    distFolder: metadata.answers.distFolder,
    bundleJSLibsFiles: [
      './node_modules/es6-promise/dist/es6-promise.auto.min.js',
      './node_modules/whatwg-fetch/fetch.js'
    ]
  };
  return appConf;
};

export const tsconfigJson = (metadata?: IGeneratorData) => {
  return {
    compilerOptions: {
      target: 'es5',
      module: 'commonjs',
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
      outDir: '../../tmp' // ts-loader issue workaround
    },
    exclude: [
      'node_modules',
      'webpack.config.js',
      'gulpfile.js',
      'build',
      'dist',
      'tmp'
    ]
  };
};

export const tslintJson = (metadata?: IGeneratorData) => {
  return {
    extends: 'tslint-config-standard',
    rules: {
      semicolon: [
        true,
        'always',
        'ignore-interfaces'
      ]
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
    ]
  };
};
