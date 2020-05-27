export interface IDependencies {
  dependencies?: (string | [ string, string ])[],
  devDependencies?: (string | [ string, string ])[]
}

export interface IPresetDependencies {
  [preset: string]: IDependencies;
}

export const npmDependencies: IDependencies = {
  dependencies: [
    [ '@pnp/pnpjs', '^1.3.11' ]
  ],
  devDependencies: [
    '@types/sharepoint',
    [ 'sp-build-tasks', '^3.15.4' ]
  ]
};

export const presetDependencies: IPresetDependencies = {
  react: {
    dependencies: [
      [ 'react', '^16.13.1' ],
      [ 'react-dom', '^16.13.1' ]
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      [ 'tslint-react', '^5.0.0' ]
    ]
  },
  'office-ui-fabric': {
    dependencies: [
      [ 'office-ui-fabric-react', '^7.115.4' ],
      [ '@uifabric/icons', '^7.3.45' ]
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
