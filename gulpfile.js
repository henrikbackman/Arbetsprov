'use strict';

/*global require*/

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    svgmin = require('gulp-svgmin'),
    uglify = require('gulp-uglify'),
    childProcess = require('child_process'),
    fork = require('child_process').fork,
    runSequence = require('run-sequence');

// ===============================
// GENERAL TASKS
gulp.task('optimize-svgs', function () {
  return gulp.src('app/assets/img/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('sass', function () {
  gulp.src('app/assets/sass/app.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(gulp.dest('public/assets'));
});

gulp.task('scripts', function () {
  gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/moment/min/moment-with-locales.js',
      'node_modules/typeahead.js/dist/typeahead.bundle.js',
      'app/assets/js/**/*.js',
    ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets'));
});

// ===============================
// BUILD RELATED
gulp.task('clean', function (callback) {
  childProcess.exec('rm -rf ./public', [], function () {
    callback();
  });
});

gulp.task('build', function (callback) {
  runSequence(
    'optimize-svgs',
    [
      'sass',
      'scripts',
    ],
    callback);
});

// ===============================
// WATCH
gulp.task('watch', function () {
  gulp.watch('app/assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}', ['optimize-svgs']);
  gulp.watch('app/assets/sass/**/*.scss', ['sass']);
  gulp.watch('app/assets/js/**/*.js', ['scripts']);
});

// ===============================
// START SERVICE

gulp.task('start-service', function () {
  childProcess.exec('npm start');
});

// ===============================
// START
gulp.task('start', function (callback) {
  runSequence(
    'clean',
    'build',
    'watch',
    'start-service',
    callback);
});

gulp.task('default', ['start']);
