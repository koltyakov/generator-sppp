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

const spBuildTasks = new (require('sp-build-tasks'))({
    privateConf: './config/private.json',
    appConfig: './config/app.json',
    taskPath: './build/tasks',
});

spBuildTasks.initGulpTasks(gulp);

// === (!) Do not modify this file directly (!) ===