'use strict';

var gulp = require('gulp'),
  csso = require('gulp-csso'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  webserver = require('gulp-webserver'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  autoprefix = require('gulp-autoprefixer'),
  notify = require("gulp-notify"),
  minifycss = require("gulp-minify-css");

/* Basic configuration of gulp */
var config = {
  sass: './_source/scss', /* Path to your projects scss files */
  scriptPath: './_source/js',
  bowerDir: './_source/js/bower_components',
  distScripts: './scripts',
  distStyles: './styles',
  distAssets: './assets'
};

var server = {
  host: 'localhost',
  port: '8001'
};


<% if(bootstrap) { %>
/* Moves bootstrap glyphicons to dist/assets/fonts folder */
gulp.task('bootstrap-icons', function () {
  return gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*')
    .pipe(gulp.dest(config.distAssets + '/fonts'));
});
<% } %>

/* Compiles sass til css (both bootstrap and your own scss files) */
gulp.task('sass-to-css', function () {
  return gulp.src(config.sass + '/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefix('last 1 version'))
    .pipe(gulp.dest(config.distStyles))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(config.distStyles));
});

/* Run jshint, uglify on scripts */
gulp.task('scripts', function () {
  return gulp.src([
      config.scriptPath + '/bower_components/angular/angular.min.js',
      config.scriptPath + '/bower_components/angular-*/*.min.js',
      config.scriptPath + '/bower_components/jquery/**/*.min.js',
      config.scriptPath + 'app.js',
      config.scriptPath + '/controllers/*.js',
      config.scriptPath + '/directives/*.js',
      config.scriptPath + '/services/*.js',
      config.scriptPath + '/templates/*.js'
      ])
    //.pipe(jshint())
    //.pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.distScripts))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(config.distScripts));
    //TODO lots more stuff
});

/* Publish dist folder */
gulp.task('publish', function () {
  return gulp.src(config.distScripts)
    .pipe(gulp.dest('c://inetpub/wwwroot/Scalepoint/Website/Content/js'));
});

/* Start a localhost webserver for testing */
gulp.task('webserver', function () {
  gulp.src('.')
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false,
      open: true
    }));
});

/* Run tasks */
gulp.task('default', [<% if(bootstrap) { %>'bootstrap-icons',<% } %> 'sass-to-css', 'scripts']);
gulp.task('script', ['scripts']);
gulp.task('style', [<% if(bootstrap) { %>'bootstrap-icons',<% } %> 'sass-to-css']);
//gulp.task('publish', ['publish']);