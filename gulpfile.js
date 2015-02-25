var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

// variables ---

var source = {}; // files to watch
source.js = ['assets/js/**/*.js', '!assets/js/min/**/*.js'];
source.sass = 'assets/sass/**/*scss';

// tasks ---

gulp.task('default', function() {
  // place code for your default task here
  console.log('Hello gulp!');
});

gulp.task('watch', function() {
  gulp.watch(source.js, ['js']);
  gulp.watch(source.sass, ['sass']);
});

gulp.task('sass', function() {
  gulp
    .src(source.sass)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
  gulp
    .src(source.js)
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/min'));
});
