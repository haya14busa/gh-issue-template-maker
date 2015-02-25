var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var minifyHtml = require('gulp-minify-html');
var webpack = require('gulp-webpack');

// variables ---

var source = {}; // files to watch
source.root = './app';
source.js = source.root + '/js/**/*.js';
source.sass = source.root + '/sass/**/*scss';
source.html = source.root + '/**/*.html';

var target = {}; // compiled files
target.root = './_target';
target.js = target.root + '/js/';
target.css = target.root + '/css/';

var config = {
  webpack: {
    entry: source.root + '/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js'],
      // root: [source.root + '/js/components']
    }
  }
};

// tasks ---

gulp.task('default', function() {
  runSequence('clean', ['build', 'browser-sync', 'watch']);
});

gulp.task('clean', function(cb) {
  return del([target.root + '/*'], cb);
});

gulp.task('build', function() {
  return gulp.start('sass', 'js', 'html');
});

gulp.task('watch', function() {
  gulp.watch(source.js, ['js', browserSync.reload]);
  gulp.watch(source.sass, ['sass', browserSync.reload]);
  gulp.watch(source.html, ['html', browserSync.reload]);
});

gulp.task('browser-sync', function() {
  // XXX: workaround
  // [error] You tried to start BrowserSync twice! To create multiple instances, use browserSync.create().init()
  if (!browserSync.active) {
    browserSync({
      server: {
        baseDir: target.root
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
  gulp
    .src(config.webpack.entry)
    .pipe(plumber())
    .pipe(webpack(config.webpack))
    .pipe(uglify())
    .pipe(gulp.dest(target.js));
});

gulp.task('html', function() {
  return gulp
    .src(source.html)
    .pipe(plumber())
    .pipe(minifyHtml())
    .pipe(gulp.dest(target.root));
});
