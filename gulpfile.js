'use strict'

let gulp = require('gulp'),
  pump = require('pump'),
  sass = require('gulp-sass');

const DEST = 'dist';

gulp.task('clean', function cleanTask() {
  let del = require('del');
  return del([
    DEST + '/**',
    '!' + DEST
  ], {
    force: true
  });
});

const getWebpackCompiler = function getWebpackCompiler() {
  let webpack = require('webpack'),
  config = require('./webpack.config');
  return webpack(config);
};

gulp.task('dist', ['clean'], function distTask(cb) {
  return getWebpackCompiler().run(cb);
});

gulp.task('serve', function serveTask(cb) {
  let WebpackDevServer = require('webpack-dev-server');
  let compiler = getWebpackCompiler();

  let server = new WebpackDevServer(compiler);
  return server.listen(8080, "localhost");
});

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
