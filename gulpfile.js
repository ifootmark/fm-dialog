/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/
var gulp = require('gulp'),
    browserify = require('browserify'),
    glob = require("glob"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var G_PATH={
  basePath:'./',
  srcPath:'lib/',
  cssPath:'css/',
  distPath:'dist'
};

//browserify
gulp.task('browserify', function(cb) {
  glob(G_PATH.srcPath+'test.js', {nodir: true}, function(err, files) {
    var b = browserify();
    files.forEach(function(file) {
      b.add(file);
    });
    b.bundle()
      .pipe(source('test.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(G_PATH.distPath));
    cb();
  });
});

//minifycss
gulp.task('minifycss', function() {
    return gulp.src(G_PATH.cssPath+'fm-dialog.css')
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(G_PATH.distPath));
});

//minifyjs
gulp.task('minifyjs', function() {
    return gulp.src(G_PATH.srcPath+'fm-dialog.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(G_PATH.distPath));
});

gulp.task('default',['browserify','minifycss','minifyjs']);