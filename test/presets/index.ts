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
    name: 'React + Office UI Fabric',
    preset: './presets/office-ui-fabric.json',
    proj: 'sppp-office-ui-fabric',
    checkFor: {
      delendencies: [ 'react', 'react-dom', '@uifabric/icons', 'office-ui-fabric-react' ],
      devDependencies: [ 'sp-build-tasks', 'tslint-react' ]
    }
  }
];
