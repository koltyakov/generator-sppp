/**
 * === (!) Do not modify this file directly (!) ===
 *
 * - Add custom tasks to './build/tasks' folder
 * - User `gulp --tasks` to see available tasks list
 *
 */

'use strict';

process.env.NODE_ENV = 'development';

const gulp = require('gulp');

new(require('sp-build-tasks'))(gulp, {
  privateConf: './config/private.json',
  appConfig: './config/app.json',
  taskPath: './build/tasks'
});

// === (!) Do not modify this file directly (!) ===
