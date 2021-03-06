'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),

    browserSync = require('browser-sync'),

    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'run-sequence']
    });

gulp.task('templates-reload', ['templates'], function() {
    browserSync.reload();
});

gulp.task('sass-reload', ['styles-dev'], function() {
    browserSync.reload();
});

gulp.task('serve-reload', ['scripts-dev'], function() {
    browserSync.reload();
});

gulp.task('serve-bs', function() {
    browserSync.init({
        startPath: '/index.html',
        server: {
            baseDir: './',
            routes: {
                '/bower_components': 'bower_components',
                '/src': 'src'
            }
        },
        port: process.env.PORT || 5000,
        notify: false,
        open: true,
        ghostMode: false
    });
});

gulp.task('serve', function() {
    return $.runSequence(
        'clean', 'watch', 'serve-bs'
    );
});
