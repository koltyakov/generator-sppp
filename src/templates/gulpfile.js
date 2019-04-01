//@ts-check

/**
 * === (!) Do not modify this file directly (!) ===
 *
 * - Add custom tasks to './build/tasks' folder
 * - User `gulp --tasks` to see available tasks list
 *
 */

const gulp = require('gulp');
require('dotenv').config();

/**
 * You can redefine parameters in environment variables.
 * Create or modify `.env` file in the projects' root folder with the following content:
 *
 * PRIVATE_JSON=./.config/private.json
 * APP_JSON=./config/app.json
 *
 */

new (require('sp-build-tasks').SPBuildTasks)(gulp, {
  privateConf: process.env.PRIVATE_JSON || './config/private.json',
  appConfig: process.env.APP_JSON || './config/app.json',
  taskPath: process.env.TASKS_PATH || './tools/tasks'
});

// === (!) Do not modify this file directly (!) ===