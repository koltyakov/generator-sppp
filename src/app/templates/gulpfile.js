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
const fs = require('fs');

let plugins = require('gulp-load-plugins')({
    pattern: [
        'gulp-*', 'gulp.*',
        'run-sequence', 'merge-stream',
        'yargs', 'del'
    ],
    rename: {
        'gulp-typescript': 'tsc',
        'run-sequence': 'rns',
        'merge-stream': 'merge'
    }
});

const taskPath = './build/tasks/';
const taskList = fs.readdirSync(taskPath);

taskList.forEach((taskFile) => {
    require(taskPath + taskFile)(gulp, plugins);
});

// === (!) Do not modify this file directly (!) ===