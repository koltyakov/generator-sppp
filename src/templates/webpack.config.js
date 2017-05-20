const path = require('path');
const webpack = require('webpack');

const config = require('./config/app.json');

module.exports = {
    cache: true,
    entry: {
        index: './src/scripts/index.ts'
    },
    output: {
        path: path.join(__dirname, config.distFolder, '/scripts'),
        filename: 'app.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /(node_modules|bower_components)/,
            use: [ 'awesome-typescript-loader' ]
        }]
    },
    plugins: [
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};
