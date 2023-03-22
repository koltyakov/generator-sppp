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
      start: 'gulp build --no-webpack && gulp serve',
      build: 'npm run clean && npm run lint && gulp build --prod',
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
    devDependencies: {},
    engines: {
      node: '>=14.0.0 <17.0.0'
    },
    volta: {
      node: '16.19.1'
    }
  };
};

export const configAppJson = (metadata: IGeneratorData): IAppConfig => {
  const isReact = getPresets(metadata).indexOf('react') !== -1;
  const isFluentUI = getPresets(metadata).indexOf('fluentui') !== -1;
  const appConf: IAppConfig = {
    $schema: '../node_modules/sp-build-tasks/schema/v1/sppp.json',
    spFolder: metadata.answers && metadata.answers.spFolder || '_catalogs/masterpage/spf',
    distFolder: metadata.answers && metadata.answers.distFolder || './dist',
    copyAssetsMap: [
      {
        name: 'Static assets',
        src: [ './src/images', './src/fonts' ],
        dist: './dist'
      },
      {
        name: 'PnPjs',
        src: [
          './node_modules/@pnp/pnpjs/dist/pnpjs.es5.umd.bundle.min.js',
          './node_modules/@pnp/pnpjs/dist/pnpjs.es5.umd.bundle.min.js.map'
        ],
        dist: './dist/libs'
      },
      ...isReact ? [
        {
          name: 'React',
          src: [
            './node_modules/react/umd/react.production.min.js',
            './node_modules/react-dom/umd/react-dom.production.min.js'
          ],
          dist: './dist/libs'
        }
      ] : [],
      ...isFluentUI ? [
        {
          name: 'Fluent UI (Office UI Fabric)',
          src: [
            './node_modules/@fluentui/react/dist/fluentui-react.min.js',
            './node_modules/@fluentui/react/dist/fluentui-react.min.js.map'
          ],
          dist: './dist/libs'
        },
        {
          name: 'Office UI Fabric Fonts',
          src: [ './node_modules/@uifabric/icons/fonts' ],
          dist: './dist'
        },
        {
          name: 'Fluent UI (Office UI Fabric) Styles',
          src: [ './node_modules/@fluentui/react/dist/css/fabric.min.css' ],
          dist: './dist/styles'
        }
      ] : []
    ],
    webpackItemsMap: [
      { name: 'Polyfills', entry: './src/scripts/utils/polyfills.ts', target: 'polyfills.js', includePolyfills: false },
      { name: 'Application', entry: './src/scripts/index.ts', target: 'app.js', includePolyfills: false }
    ]
  };
  return appConf;
};

export const tsconfigJson = (_metadata?: IGeneratorData) => {
  const isReact = getPresets(_metadata).indexOf('react') !== -1;
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
      removeComments: false,
      experimentalDecorators: true,
      skipLibCheck: true,
      strictNullChecks: true,
      types: [ 'node', 'sharepoint' ],
      outDir: 'tmp',
      baseUrl: 'src/',
      paths: {
        '@config': [ 'scripts/config' ],
        '@domain/*': [ 'scripts/domain/*' ],
        '@api/*': [ 'scripts/api/*' ],
        '@utils/*': [ 'scripts/utils/*' ],
        ...isReact ? {
          '@components/*': [ 'scripts/components/*' ],
          '@containers/*': [ 'scripts/containers/*' ]
        } : {}
      }
    },
    exclude: [
      'node_modules',
      'webpack.config.js',
      'gulpfile.js',
      'build',
      'dist',
      'tmp',
      'cache',
      'tools',
      'provisioning'
    ]
  };
};

export const tslintJson = (_metadata?: IGeneratorData) => {
  const isReact = getPresets(_metadata).indexOf('react') !== -1;
  return {
    extends: [
      'tslint:latest',
      ...isReact ? [ 'tslint-react' ] : []
    ],
    linterOptions: {
      exclude: [
        'config/**/*.js',
        'tools/**/*.js',
        'tools/**/*.ts',
        'provisioning/**/*.js',
        'node_modules/**/*.ts'
      ]
    },
    rules: {
      'quotemark': [true, 'single', 'jsx-single'],
      'indent': [true, 'spaces', 2],
      'semicolon': [true, 'always', 'ignore-interfaces'],
      'ordered-imports': false,
      'object-literal-sort-keys': false,
      'space-before-function-paren': false,
      'no-empty-interface': false,
      'trailing-comma': true,
      'no-implicit-dependencies': [true, [
        '@utils', '@config', '@api', '@components', '@containers', '@domain',
        'sp-rest-proxy', 'sp-build-tasks', '@pnp'
      ]],
      'jsx-no-lambda': false,
      'jsx-no-multiline-js': false,
      'arrow-parens': true,
      'max-line-length': [ true, 120 ]
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

const getPresets = (_metadata?: IGeneratorData): string[] => {
  const presets = _metadata
    && _metadata.answers
    && _metadata.answers.additional
    && _metadata.answers.additional.presets
    || [];
  return presets;
};
