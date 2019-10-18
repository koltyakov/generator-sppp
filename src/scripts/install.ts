export interface IDependencies {
  dependencies?: (string | [ string, string ])[],
  devDependencies?: (string | [ string, string ])[]
}

export interface IPresetDependencies {
  [preset: string]: IDependencies;
}

export const npmDependencies: IDependencies = {
  dependencies: [
    [ '@pnp/pnpjs', '^1.3.6' ]
  ],
  devDependencies: [
    '@types/sharepoint',
    [ 'sp-build-tasks', '^3.11.2' ],
    [ 'tslint-config-standard', '^8.0.1' ]
  ]
};

export const presetDependencies: IPresetDependencies = {
  react: {
    dependencies: [
      [ 'react', '^16.10.2' ],
      [ 'react-dom', '^16.10.2' ]
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      [ 'tslint-react', '^4.1.0' ]
    ]
  },
  'office-ui-fabric': {
    dependencies: [
      [ 'office-ui-fabric-react', '^7.48.1' ],
      [ '@uifabric/icons', '^7.3.0' ]
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
