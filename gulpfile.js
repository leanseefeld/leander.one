'use strict'

let gulp = require('gulp'),
  pump = require('pump'),
  sass = require('gulp-sass');

const DEST = 'dist',
  SASS_GLOB = 'src/style/**/*.scss';

gulp.task('sass', function sassTask() {
  return pump([
    gulp.src(SASS_GLOB),
    sass().on('error', sass.logError),
    gulp.dest(DEST + '/style')
  ]);
});

gulp.task('sass:watch', function sassWatch() {
  gulp.watch(SASS_GLOB, ['sass']);
});

gulp.task('images', function imgTask() {
  return pump([
    gulp.src('src/img/*.*'),
    gulp.dest(DEST + '/img')
  ]);
});

gulp.task('html', function htmlTask() {
  return pump([
    gulp.src('src/**/*.html'),
    gulp.dest(DEST)
  ]);
});

gulp.task('clean', function cleanTask() {
  let del = require('del');
  return del([DEST], {
    force: true
  });
});

gulp.task('dist', ['clean'], function distTask(cb) {
  let runSequence = require('run-sequence');
  runSequence([
      'images',
      'sass',
      'html'
    ], //
    function(result) {
      if (result) {
        console.error(result);
      } else {
        console.log('Dist finished');
      }
      cb(result);
    });
});
