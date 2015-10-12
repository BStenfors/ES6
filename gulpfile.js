'use strict';

var gulp = require('gulp'),
    util = require("gulp-util"),//https://github.com/gulpjs/gulp-util
    sass = require("gulp-sass"),//https://www.npmjs.org/package/gulp-sass
    autoprefixer = require('gulp-autoprefixer'),//https://www.npmjs.org/package/gulp-autoprefixer
    minifycss = require('gulp-minify-css'),//https://www.npmjs.org/package/gulp-minify-css
    rename = require('gulp-rename'),//https://www.npmjs.org/package/gulp-rename
    log = util.log;
var gls = require('gulp-live-server');
var gulpLiveReload = require('gulp-livereload');

gulp.task("sass", function(){
    log("Generate CSS files " + (new Date()).toString());
    gulp.src('./public/stylesheets/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
        .pipe(gulp.dest("stylesheets"))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('stylesheets'));
});

gulp.task('serve', function() {
//    //1. run your script as a server
    var server = gls.new('./bin/www');
    server.start();
//
//    //2. run script with cwd args, e.g. the harmony flag
//    //var server = gls.new(['app.js']);
//    //this will achieve `node --harmony myapp.js`
//    //you can access cwd args in `myapp.js` via `process.argv`
//    //server.start();
//
//    //use gulp.watch to trigger server actions(notify, start or stop)
//    gulp.watch(['./public/js/**/*.js', './public/views/**/*.html'], function () {
//        server.notify.apply(server, arguments);
//        //server.start();
//    });
//
//    //gulp.watch('./bin/www', server.start.bind(server)); //restart my server
});

gulp.task('changes', function(){
    gulpLiveReload.listen();
    gulp.watch('./public/stylesheets/*.scss', ["sass"]);
    gulp.watch(['./public/js/**/*.js', './public/views/**/*.html']);
})

gulp.task('default', ['serve', 'changes']);