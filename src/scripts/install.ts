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
    [ 'sp-build-tasks', '^3.18.0' ]
  ]
};

export const presetDependencies: IPresetDependencies = {
  react: {
    dependencies: [
      [ 'react', '^17.0.1' ],
      [ 'react-dom', '^17.0.1' ]
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      [ 'tslint-react', '^5.0.0' ]
    ]
  },
  fluentui: {
    dependencies: [
      [ '@fluentui/react', '^7.156.0' ],
      [ '@uifabric/icons', '^7.5.18' ]
    ]
  }
};
