export const presets = [
  {
    name: 'Default',
    preset: './presets/default.json',
    proj: 'sppp-default',
    checkFor: {
      delendencies: [ '@pnp/pnpjs' ],
      devDependencies: [ 'sp-build-tasks' ]
    }
  },
  {
    name: 'React',
    preset: './presets/react.json',
    proj: 'sppp-react',
    checkFor: {
      delendencies: [ 'react', 'react-dom' ],
      devDependencies: [ 'sp-build-tasks', 'tslint-react' ]
    }
  },
  {
    name: 'React + Fluent UI',
    preset: './presets/fluentui.json',
    proj: 'sppp-fluentui',
    checkFor: {
      delendencies: [ 'react', 'react-dom', '@uifabric/icons', '@fluentui/react' ],
      devDependencies: [ 'sp-build-tasks', 'tslint-react' ]
    }
  }
];
