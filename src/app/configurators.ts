import { IPackageJsonMetadata, IGeneratorData, IAppConf } from './interfaces';

export const createPackageJson = (metadata: IGeneratorData) => {
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

export const createAppJson = (metadata: IGeneratorData) => {
    let appConf: IAppConf = {
        spFolder: metadata.answers.spFolder,
        distFolder: metadata.answers.distFolder
    };
    return appConf;
};

