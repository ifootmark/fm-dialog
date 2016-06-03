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
  distPath:'./dist'
};

//browserify
gulp.task('browserify', function(cb) {
  glob('./lib/test.js', {nodir: true}, function(err, files) {
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
    return gulp.src(G_PATH.cssPath+'*.css')//source
        .pipe(minifycss())//uglify
        .pipe(rename({suffix: '.min'}))//rename
        .pipe(gulp.dest(G_PATH.cssPath));//output
});

//minifyjs
gulp.task('minifyjs', function() {
    return gulp.src(G_PATH.srcPath+'idialog.js')
        .pipe(uglify())//uglify
        .pipe(rename({suffix: '.min'}))//rename
        .pipe(gulp.dest(G_PATH.distPath));//output
});

gulp.task('jquery', function() {
    return gulp.src(G_PATH.srcPath+'jquery-2.2.0.min.js')
        .pipe(gulp.dest(G_PATH.distPath));
});

gulp.task('default',['browserify','minifycss','minifyjs','jquery']);