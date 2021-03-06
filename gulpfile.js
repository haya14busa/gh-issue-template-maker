var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var minifyHtml = require('gulp-minify-html');
var webpack = require('webpack');
var gulpwebpack = require('gulp-webpack');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');

// variables ---

var source = {}; // files to watch
source.root = './app';
source.js = source.root + '/js/**/*.js{,x}';
source.less = source.root + '/less/**/*less';
source.html = source.root + '/**/*.html';

var target = {}; // compiled files
target.root = './_target';
target.lib = {
  js: target.root + '/lib/js/',
  css: target.root + '/lib/css/',
  assets: target.root + '/lib/assets/'
}
target.js = target.root + '/js/';
target.css = target.root + '/css/';

var config = {
  webpack: {
    entry: source.root + '/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader?harmony' }
      ]
    },
    externals: {
      'react': 'React',
      'react/addons': 'React',
      'jQuery': '$'
    },
    resolve: {
      extensions: ['', '.js'],
      root: [source.root + '/js/', './bower_components/']
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      )
    ]
  }
};

// tasks ---

gulp.task('default', function() {
  runSequence('clean', 'build', ['browser-sync', 'watch']);
});

gulp.task('clean', function(cb) {
  return del([target.root + '/*'], cb);
});

gulp.task('build', ['bower', 'css', 'js', 'html']);

gulp.task('watch', function() {
  gulp.watch(source.js, ['js', browserSync.reload]);
  gulp.watch(source.less, ['css', browserSync.reload]);
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

gulp.task('bower', function() {
  var jsFilter = gulpFilter('**/*.js');
  var cssFilter = gulpFilter('**/*.css');
  var imageFilter = gulpFilter('**/*.png');
  return gulp
    // NOTE: do not use mainBowerFiles() because I want to use react-with-addon
    // .src(mainBowerFiles())
    .src('./bower_components/**/*')
    .pipe(jsFilter)
    .pipe(gulp.dest(target.lib.js))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(gulp.dest(target.lib.css))
    .pipe(cssFilter.restore())
    .pipe(imageFilter)
    .pipe(gulp.dest(target.lib.assets));
});

gulp.task('css', function() {
  return gulp
    .src(source.less)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest(target.css));
});

gulp.task('js', function() {
  return gulp
    .src(config.webpack.entry)
    .pipe(plumber())
    .pipe(gulpwebpack(config.webpack))
    // .pipe(uglify())
    .pipe(gulp.dest(target.js));
});

gulp.task('html', function() {
  return gulp
    .src(source.html)
    .pipe(plumber())
    .pipe(minifyHtml())
    .pipe(gulp.dest(target.root));
});
