var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
  console.log('Hello gulp!');
});

gulp.task('sass', function() {
  gulp
    .src('assets/sass/**/*scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
  gulp
    .src(['assets/js/**/*.js', '!assets/js/min/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/min'));
});
