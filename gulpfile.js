// styles min, watch
// scripts min, watch
// browser reload / sync


var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss'); // to minify files
var concat = require('gulp-concat');
var minify = require('gulp-minify'); // minify js
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('app-styles', function() {
  return gulp.src("src/styles/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(uglifycss())
    .pipe(gulp.dest("build/styles"))
    .pipe(connect.reload());
});

gulp.task('app-scripts', function() {
  return gulp.src("src/js/*.js")
    .pipe(concat("all.js"))
    .pipe(minify())
    .pipe(gulp.dest("build/js"))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  var appStyles = ['app-styles'];
  var appScripts = ['app-scripts'];
  // var index = ['index'];

  gulp.watch('src/styles/**/*.scss', appStyles);
  gulp.watch('src/js/*.js', appScripts);
  // gulp.watch('src/index.html', index);
});

// concatenate styles for production
gulp.task('styles-prod', function() {
  return gulp.src("build/styles/**/*.css")
    .pipe(concat("all.css"))
    .pipe(gulp.dest("build/styles"))
});

gulp.task('default', ['connect', 'watch']);