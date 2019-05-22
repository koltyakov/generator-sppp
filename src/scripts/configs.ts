import { IPackageJsonMetadata, IGeneratorData, IAppConfig } from './interfaces';

export const packageJson = (metadata: IGeneratorData) => {
  const data: IPackageJsonMetadata = {
    ...(metadata.answers as IPackageJsonMetadata),
    version: metadata.answers && metadata.answers.version || '1.0.0',
    license: metadata.answers && metadata.answers.license || 'MIT'
  };
  return {
    name: data.name,
    version: data.version,
    description: data.description,
    main: './dist/index.js',
    typings: './dist/index',
    private: true,
    scripts: {
      start: 'gulp serve',
      build: 'npm run lint && npm run clean && gulp build --prod',
      watch: 'gulp watch',
      'watch:prod': 'gulp watch --prod',
      config: 'gulp config --init',
      connect: 'npm run config',
      clean: 'rimraf ./dist ./tmp ./cache',
      publish: 'gulp push --diff',
      analyze: 'gulp analyze',
      lint: `tslint -p .`
    },
    author: data.author,
    license: data.license,
    dependencies: {},
    devDependencies: {}
  };
};

export const configAppJson = (metadata: IGeneratorData): IAppConfig => {
  const appConf: IAppConfig = {
    $schema: '../node_modules/sp-build-tasks/schema/v1/sppp.json',
    spFolder: metadata.answers && metadata.answers.spFolder || '_catalogs/masterpage/spf',
    distFolder: metadata.answers && metadata.answers.distFolder || './dist',
    copyAssetsMap: [{
      name: 'PnPjs',
      src: [
        './node_modules/@pnp/pnpjs/dist/pnpjs.es5.umd.bundle.min.js',
        './node_modules/@pnp/pnpjs/dist/pnpjs.es5.umd.bundle.min.js.map'
      ],
      dist: './dist/libs'
    }],
    webpackItemsMap: [
      { name: 'Polyfills', entry: './src/scripts/utils/polyfills.ts', target: 'polyfills.js', includePolyfills: false },
      { name: 'Application', entry: './src/scripts/index.ts', target: 'app.js', includePolyfills: false }
    ]
  };
  return appConf;
};

export const tsconfigJson = (_metadata?: IGeneratorData) => {
  return {
    compilerOptions: {
      target: 'es5',
      module: 'esnext',
      lib: [ 'es2017', 'dom' ],
      rootDir: 'src',
      jsx: 'react',
      sourceMap: true,
      declaration: true,
      moduleResolution: 'node',
      noImplicitAny: false,
      removeComments: true,
      experimentalDecorators: true,
      skipLibCheck: true,
      strictNullChecks: true,
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
    plugins: [ 'standard', 'promise' ]
  };
};

export const prettierJson = (_metadata?: IGeneratorData) => {
  return {
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    parser: 'flow'
  };
};
