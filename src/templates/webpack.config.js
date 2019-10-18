// Rewrite webpack config if needed, aka "eject"

const { join } = require('path');
const { DefinePlugin } = require('webpack');
const configs = require('sp-build-tasks/dist/webpack/config/v2');

require('dotenv').config();

const defineOptions = Object.assign(
  // Options from ./config/app.json are passed to Define plugin
  {
    APP_CONFIG: JSON.stringify(
      require(join(process.cwd(), process.env.APP_JSON || './config/app.json'))
    ),
    SPPP_ASSETS_LOCATION: JSON.stringify('SPWeb')
  },
  // All environment variables which start with "SPPP_" are passed to Define plugin
  Object.keys(process.env).filter(key => key.indexOf('SPPP_') === 0).reduce((res, key) => {
    res[key] = JSON.stringify(process.env[key]);
    return res;
  }, {})
);

configs.forEach(config => {

  delete config.output.publicPath; // use dynamic __webpack_public_path__

  // Define plugin
  config.plugins = config.plugins || [];
  config.plugins.push(new DefinePlugin(defineOptions));

  // Exclude "heavy" 3rd parties
  config.externals = Object.assign(config.externals || {}, {
    '@pnp/sp': 'pnp',
    '@pnp/odata': 'pnp',
    '@pnp/logging': 'pnp',
    '@pnp/common': 'pnp',
    '@pnp/graph': 'pnp',
    '@pnp/pnpjs': 'pnp',
    'office-ui-fabric-react': 'Fabric',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment',
    'bootstrap': 'bootstrap',
    'jquery': 'jQuery'
  });

});

module.exports = configs;
