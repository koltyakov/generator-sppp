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
        spFolder: metadata.answers.spFolder,
        distFolder: metadata.answers.distFolder
    };
    return appConf;
};

export const tsconfigJson = (metadata?: IGeneratorData) => {
    return {
        'compilerOptions': {
            'target': 'es5',
            'module': 'commonjs',
            'lib': [ 'es2015', 'dom' ],
            'sourceMap': true,
            'declaration': true,
            'moduleResolution': 'node',
            'noImplicitAny': false,
            'removeComments': true,
            'types': [
                'node'
            ],
            'outDir': './tmp'
        }
    };
};

export const tslintJson = (metadata?: IGeneratorData) => {
    return {
        'rules': {
            'class-name': true,
            'comment-format': [
                true,
                'check-space'
            ],
            'curly': true,
            'eofline': true,
            'forin': true,
            'indent': [
                true,
                'spaces'
            ],
            'label-position': true,
            'max-line-length': [
                true,
                180
            ],
            'member-access': true,
            'member-ordering': [
                true,
                'public-before-private',
                'static-before-instance',
                'variables-before-functions'
            ],
            'no-arg': true,
            'no-bitwise': true,
            'no-console': [
                true,
                'debug',
                'info',
                'time',
                'timeEnd',
                'trace'
            ],
            'no-construct': true,
            'no-debugger': false,
            'no-duplicate-variable': true,
            'no-empty': true,
            'no-eval': true,
            'no-shadowed-variable': true,
            'no-string-literal': true,
            'no-switch-case-fall-through': true,
            'no-trailing-whitespace': true,
            'no-unused-expression': true,
            'no-unused-variable': true,
            'no-use-before-declare': true,
            'no-var-keyword': true,
            'one-line': [
                true,
                'check-open-brace',
                'check-catch',
                'check-else',
                'check-finally',
                'check-whitespace'
            ],
            'quotemark': [
                true,
                'single',
                'avoid-escape'
            ],
            'radix': true,
            'semicolon': [
                true,
                'always'
            ],
            'trailing-comma': [
                true,
                {
                    'singleline': 'never',
                    'multiline': 'never'
                }
            ],
            'triple-equals': [
                true,
                'allow-null-check'
            ],
            'typedef-whitespace': [
                true,
                {
                    'call-signature': 'nospace',
                    'index-signature': 'nospace',
                    'parameter': 'nospace',
                    'property-declaration': 'nospace',
                    'variable-declaration': 'nospace'
                }
            ],
            'variable-name': false,
            'whitespace': [
                true,
                'check-branch',
                'check-decl',
                'check-operator',
                'check-separator',
                'check-type'
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
