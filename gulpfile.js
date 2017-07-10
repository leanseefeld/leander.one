'use strict'

let gulp = require('gulp'),
  pump = require('pump'),
  sass = require('gulp-sass');

const DEST = 'dist',
  SASS_GLOB = 'src/style/**/*.scss',
  IMG_GLOB = 'src/img/*.*',
  HTML_BLOB = 'src/**/*.html';

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
    gulp.src(IMG_GLOB),
    gulp.dest(DEST + '/img')
  ]);
});

gulp.task('images:watch', function imagesWatch() {
  gulp.watch(IMG_GLOB, ['images']);
});

gulp.task('html', function htmlTask() {
  return pump([
    gulp.src(HTML_BLOB),
    gulp.dest(DEST)
  ]);
});

gulp.task('html:watch', function htmlWatch() {
  gulp.watch(HTML_BLOB, ['html']);
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

gulp.task('watch', ['images:watch', 'sass:watch', 'html:watch']);

const deploy = function deploy(force) {
  let ftp = require('vinyl-ftp'),
    gutil = require('gulp-util'),
    config = require('./ftp-config');

  config.log = gutil.log;
  let conn = ftp.create(config);
  let tasks = [
    gulp.src(DEST + '/**/*', {
      base: './' + DEST,
      buffer: false
    }),
    conn.dest('/')
  ];
  if (!force) {
    tasks.splice(1, 0, conn.newer('/')); // only upload newer files
  }
  return pump(tasks);
}

gulp.task('deploy', ['dist'], function taskDeploy() {
  return deploy();
});

gulp.task('force-deploy', ['dist'], function taskForceDeploy() {
  return deploy(true);
});
