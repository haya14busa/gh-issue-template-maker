var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// variables ---

var source = {}; // files to watch
source.js = 'assets/js/**/*.js';
source.sass = 'assets/sass/**/*scss';

var target = {}; // compiled files
target.root = '_target/';
target.js = target.root + 'js/';
target.css = target.root + 'css/';

// tasks ---

gulp.task('default', function() {
  runSequence('clean', ['build', 'browser-sync', 'watch']);
});

gulp.task('clean', function(cb) {
  return del([target.root + '/*'], cb);
});

gulp.task('build', function() {
  return gulp.start('sass', 'js');
});

gulp.task('watch', function() {
  gulp.watch(source.js, ['js', browserSync.reload]);
  gulp.watch(source.sass, ['sass', browserSync.reload]);
  gulp.watch('./index.html', [browserSync.reload]);
});

gulp.task('browser-sync', function() {
  // XXX: workaround
  // [error] You tried to start BrowserSync twice! To create multiple instances, use browserSync.create().init()
  if (!browserSync.active) {
    browserSync({
      server: {
        baseDir: './'
      },
      host: 'localhost'
    });
  }
});

// specific tasks ---

gulp.task('sass', function() {
  return gulp
    .src(source.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(target.css));
});

gulp.task('js', function() {
  // XXX: workaround
  // Error: EEXIST, mkdir
  return del(target.js, function() {
    return gulp
      .src(source.js)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest(target.js));
  });
});
