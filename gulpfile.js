const gulp = require('gulp');
const browserSync = require('browser-sync');
const karma = require('karma').Server;
const path = require('path');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');

gulp.task('default', ['serve', 'watch', 'scripts']);

gulp.task('serve', () => {
  browserSync.init({
      server: {
          baseDir: './',
          index: './src/frontend/index.html',
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
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('frontend/js/*.js', browserSync.reload);
});


gulp.task('test', ['karma']);

