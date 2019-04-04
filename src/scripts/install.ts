export const npmDependencies = {
  dependencies: [
    '@pnp/pnpjs' // @1.3.1
  ],
  devDependencies: [
    '@types/sharepoint',
    'sp-build-tasks',
    'concurrently',
    'tslint-config-standard',
    'eslint-config-standard'
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
      '@types/react-dom'
    ]
  }
};
