var gulp = require('gulp');
var sppull = require('sppull').sppull;
var spsave = require("gulp-spsave");
var watch = require("gulp-watch");
var prompt = require("gulp-prompt");
var config = require('./config.extend');

var through = require('through2');
var LiveReload = require('sp-live-reload');

gulp.task('touch-conf', function() {
    console.log("Checking configs...");
    return gulp.src('').pipe(config.validateLocalConfig());
});

gulp.task('sppull-all', ['touch-conf'], function(cb) {
    console.log("Pulling from SharePoint");
    sppull(config, config)
        .then(function() {
            cb();
        })
        .catch(function(err) {
            cb(err);
        });
});

gulp.task("watch-assets", ['touch-conf'], function () {
    console.log("Watch Assets");
    var gulpconfig = require('./gulpconfig.js');
    return watch(gulpconfig.watch.assets, function (event) {
        console.log(event.path);
        gulp.src(event.path, {
            base: gulpconfig.watch.base
        }).pipe(spsave(gulpconfig.spsave.coreOptions, config));
    });
});

gulp.task("publish", ['touch-conf'], function () {
    console.log("Publish Assets");
    var gulpconfig = require('./gulpconfig.js');
    return gulp.src(gulpconfig.watch.assets, {
        base: gulpconfig.watch.base
    }).pipe(spsave(gulpconfig.spsave.coreOptions, config));
});

gulp.task("watch-live", ['touch-conf'], function () {
    console.log("Watch with reload is initiated");

    var gulpconfig = require('./gulpconfig.js');
    var liveReload = new LiveReload(gulpconfig.liveReload);
    liveReload.runServer();

    return watch(config.watch.assets, function (event) {
        console.log(event.path);
        gulp.src(event.path, {
            base: gulpconfig.watch.base
        }).pipe(spsave(gulpconfig.spsave.coreOptions, config))
        .pipe(through.obj(function (chunk, enc, cb) {
            var chunkPath = chunk.path;
            liveReload.emitUpdatedPath(chunkPath);
            cb(null, chunk);
        }));
    });
});

gulp.task("live-reload-install", ['touch-conf'], function () {
    console.log("Installing live reload to site collection");

    var gulpconfig = require('./gulpconfig.js');
    var liveReload = new LiveReload(config.liveReload);
    liveReload.provisionMonitoringAction(function() {
        console.log("Custom action has been installed");
    }, function(err) {
        console.log(err.message);
    });
});

gulp.task("live-reload-retract", ['touch-conf'], function () {
    console.log("Retracting live reload from site collection");

    var gulpconfig = require('./gulpconfig.js');
    
    var liveReload = new LiveReload(gulpconfig.liveReload);
    liveReload.retractMonitoringAction(function() {
        console.log("Custom action has been retracted");
    }, function(err) {
        console.log(err.message);
    });
});