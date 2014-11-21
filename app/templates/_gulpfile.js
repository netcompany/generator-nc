'use strict';

var gulp = require('gulp'),  

    csso = require('gulp-csso'), 
    jshint = require('gulp-jshint'), 
    uglify = require('gulp-uglify'), 
    sass = require('gulp-sass' ), 

    //sass = require('gulp-ruby-sass') ,
    autoprefix = require('gulp-autoprefixer') 
    notify = require("gulp-notify") 
    //bower = require('gulp-bower');


/* Basic configuration of gulp */
var config = {
     sassPath: './style', /* Path to your projects scss files */
	scriptPath: './scripts',
     bowerDir: './bower_components' 
}

/* Moves bootstrap glyphicons to dist/fonts folder */
gulp.task('bootstrap-icons', function() { 
    return gulp.src(config.bowerDir + '/bootstrap/fonts/**.*') 
        .pipe(gulp.dest('./dist/fonts')); 
});

/* Compiles sass til css (both bootstrap and your own scss files) */
gulp.task('sass-to-css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
        .pipe(autoprefix('last 1 version'))
         .pipe(gulp.dest('./dist/css')); 
});

/* Run jshint on scripts */
gulp.task('scripts', function () {
  return gulp.src(config.scriptPath + '/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/* Run tasks */
  gulp.task('default', ['bootstrap-icons', 'sass-to-css', 'scripts']);
