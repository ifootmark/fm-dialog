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
  uglify = require('gulp-uglify'),
  runSequence = require('run-sequence'),
  header = require('gulp-header');

var G_PATH = {
  basePath: './',
  srcPath: 'src/',
  cssPath: 'css/',
  distPath: 'dist'
};

function buildHeader() {
  var pkg = require('./package.json');
  var banner = ['/**',
    ' * @providesModule <%= pkg.name %> - <%= pkg.description %>',
    ' * @author <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' * @time ' + getTime(),
    ' */',
    ''
  ].join('\n');
  return header(banner, {
    pkg: pkg
  });
}
function getTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  var time = year + '-' + month + '-' + d + ' ' + h + ':' + m + ':' + s;
  return time;
}

//minifycss
gulp.task('minifycss', function() {
  return gulp.src(G_PATH.cssPath + 'fm.dialog.css')
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(buildHeader())
    .pipe(gulp.dest(G_PATH.distPath));
});

//minifyjs
gulp.task('minifyjs', function() {
  return gulp.src(G_PATH.srcPath + 'fm.dialog.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(buildHeader())
    .pipe(gulp.dest(G_PATH.distPath));
});

//minijs
/*gulp.task('minijs', function(cb) {
  glob(G_PATH.srcPath + 'fm.dialog.js', {nodir: true}, function(err, files) {
    var b = browserify();
    files.forEach(function(file) {
      b.add(file);
    });
    b.bundle()
      .pipe(source('fm.dialog.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(buildHeader())
      .pipe(gulp.dest(G_PATH.distPath));
    cb();
  });
});*/

gulp.task('deploy', function() {
  runSequence('minifycss', 'minifyjs');
});

gulp.task('default', ['deploy']);

var watcher = gulp.watch([G_PATH.srcPath + '*.js', G_PATH.cssPath + 'fm.dialog.css'], ['deploy']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
