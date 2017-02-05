const gulp = require('gulp');
const browserSync = require('browser-sync');
const karma = require('karma').Server;
const path = require('path');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const jasmine = require('gulp-jasmine');

gulp.task('default', ['serve', 'watch']);

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: ['./src', './src/frontend'],
      index: 'index.html',
    },
    port: 8000
  });
});

gulp.task('karma', (done) => {
  karma.start({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, () => {
    done();
  });
});

gulp.task('watch', () => {
  gulp.watch('./src/frontend/index.html', browserSync.reload);
  gulp.watch('./src/frontend/js/*.js', browserSync.reload);
  gulp.watch('./src/frontend/css/*.css', browserSync.reload);
  gulp.watch('./src/inverted-index.js', browserSync.reload);
  gulp.watch('./jasmine/spec/*.js', browserSync.reload);
});

gulp.task('test', ['karma']);

