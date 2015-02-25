var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
  console.log('Hello gulp!');
});

gulp.task('sass', function() {
  gulp
    .src('assets/sass/**/*scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/css'));
});
