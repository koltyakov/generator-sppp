//@ts-check

/**
 * === (!) Do not modify this file directly (!) ===
 *
 * - Add custom tasks to './build/tasks' folder
 * - User `gulp --tasks` to see available tasks list
 *
 */

'use strict';

const gulp = require('gulp');
const { default: SPBuild } = require('sp-build-tasks');
const dotenv = require('dotenv');

dotenv.load();

/**
 * You can redefine parameters in environment variables.
 * Create or modify `.env` file in the projects' root folder with the following content:
 *
 * PRIVATE_JSON=./.config/private.json
 * APP_JSON=./config/app.json
 *
 */

new SPBuild(gulp, {
  privateConf: process.env.PRIVATE_JSON || './config/private.json',
  appConfig: process.env.APP_JSON || './config/app.json',
  taskPath: './tools/tasks'
});

// === (!) Do not modify this file directly (!) ===