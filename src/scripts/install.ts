export interface IDependencies {
  dependencies?: (string | [ string, string ])[],
  devDependencies?: (string | [ string, string ])[]
}

export interface IPresetDependencies {
  [preset: string]: IDependencies;
}

export const npmDependencies: IDependencies = {
  dependencies: [
    [ '@pnp/pnpjs', '^1.3.5' ]
  ],
  devDependencies: [
    '@types/sharepoint',
    [ 'sp-build-tasks', '^3.9.0' ],
    [ 'tslint-config-standard', '^8.0.1' ]
  ]
};

export const presetDependencies: IPresetDependencies = {
  react: {
    dependencies: [
      [ 'react', '^16.9.0' ],
      [ 'react-dom', '^16.9.0' ]
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      [ 'tslint-react', '^4.1.0' ]
    ]
  },
  'office-ui-fabric': {
    dependencies: [
      [ 'office-ui-fabric-react', '^7.34.0' ],
      [ '@uifabric/icons', '^7.2.1' ]
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
