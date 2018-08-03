// Rewrite webpack config if needed, aka "eject"

const { join } = require('path');
const { DefinePlugin } = require('webpack');
const configs = require('sp-build-tasks/dist/webpack/config');

require('dotenv').load();

const defineOptions = {
  APP_CONFIG: JSON.stringify(
    require(join(process.cwd(), process.env.APP_JSON || './config/app.json'))
  )
};

configs.forEach(config => {

  // Define plugin
  config.plugins = config.plugins || [];
  config.plugins.push(new DefinePlugin(defineOptions));

  // Exclude "heavy" 3rd parties
  config.externals = Object.assign(config.externals || {}, {
    '@pnp/sp': 'pnp',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment',
    'bootstrap': 'bootstrap',
    'jquery': 'jQuery'
  });

});

module.exports = configs;