export interface IDependencies {
  dependencies?: (string | [ string, string ])[],
  devDependencies?: (string | [ string, string ])[]
}

export interface IPresetDependencies {
  [preset: string]: IDependencies;
}

export const npmDependencies: IDependencies = {
  dependencies: [
    [ '@pnp/pnpjs', '^1.3.2' ]
  ],
  devDependencies: [
    '@types/sharepoint',
    [ 'sp-build-tasks', '^3.7.2' ],
    [ 'tslint-config-standard', '^8.0.1' ]
    // [ 'typescript', '^3.4.5' ],
    // [ 'tslint', '^5.16.0' ]
  ]
};

export const presetDependencies: IPresetDependencies = {
  react: {
    dependencies: [
      [ 'react', '^16.8.6' ],
      [ 'react-dom', '^16.8.6' ]
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      [ 'tslint-react', '^4.0.0' ]
    ]
  },
  'office-ui-fabric': {
    dependencies: [
      [ 'office-ui-fabric-react', '^6.185.0' ],
      [ '@uifabric/icons', '^6.5.2' ]
    ]
  },
  eslint: {
    devDependencies: [
      'eslint',
      'eslint-config-standard',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-promise',
      'eslint-plugin-standard'
    ]
  }
};
