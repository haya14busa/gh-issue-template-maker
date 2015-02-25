var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');

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
  // place code for your default task here
  console.log('Hello gulp!');
});

gulp.task('clean', function(cb) {
  del([target.root + '/*'], cb);
});

gulp.task('watch', function() {
  gulp.watch(source.js, ['js']);
  gulp.watch(source.sass, ['sass']);
});

gulp.task('sass', function() {
  gulp
    .src(source.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(target.css));
});

gulp.task('js', function() {
  gulp
    .src(source.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(target.js));
});
