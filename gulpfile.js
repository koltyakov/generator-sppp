'use strict';

const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
const runSequence = require('run-sequence');

const tsconfig = require('./tsconfig.json');

// Clean generators folder
gulp.task('clean', () => {
  return del(['app/**']);
});

// Compile TypeScript files
gulp.task('tsc', () => {
  return gulp
    .src(['./src/**/*.ts', '!**/templates/src/scripts/index.ts'])
    .pipe(tsc.createProject('tsconfig.json')())
    .js.pipe(gulp.dest('./app'));
});

// Copy assets to generators folder
gulp.task('assets', () => {
  return gulp
    .src(['./src/templates/**/*']) // '!**/*.ts'
    .pipe(gulp.dest('./app/templates'));
});

// Prepublish build
gulp.task('build', ['clean'], (cb) => {
  runSequence(['tsc', 'assets'], cb);
});
