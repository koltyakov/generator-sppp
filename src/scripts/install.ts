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
    [ 'sp-build-tasks', '^3.19.4' ],
    [ 'cross-env', '^7.0.3' ]
  ]
};

export const presetDependencies: IPresetDependencies = {
  react: {
    dependencies: [
      [ 'react', '^17.0.2' ],
      [ 'react-dom', '^17.0.2' ]
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      [ 'tslint-react', '^5.0.0' ]
    ]
  },
  fluentui: {
    dependencies: [
      [ '@fluentui/react', '^8.17.4' ],
      [ '@uifabric/icons', '^7.5.23' ]
    ]
  }
};
