export const npmDependencies = {
  dependencies: [
    '@pnp/pnpjs' // @1.3.2
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
      '@types/react-dom'
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
