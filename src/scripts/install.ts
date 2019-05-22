export const npmDependencies = {
  dependencies: [
    '@pnp/sp',
    '@pnp/odata',
    '@pnp/common',
    '@pnp/logging'
  ],
  devDependencies: [
    '@types/sharepoint',
    'sp-build-tasks',
    'tslint-config-standard'
  ]
};

export const presetDependencies = {
  react: {
    dependencies: [
      'react',
      'react-dom'
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      'tslint-react'
    ]
  },
  'office-ui-fabric': {
    dependencies: [
      'office-ui-fabric-react',
      '@uifabric/icons'
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
