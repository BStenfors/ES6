'use strict';

var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve', function() {
    //1. run your script as a server
    var server = gls.new('./bin/www');
    server.start();

    //2. run script with cwd args, e.g. the harmony flag
    //var server = gls.new(['app.js']);
    //this will achieve `node --harmony myapp.js`
    //you can access cwd args in `myapp.js` via `process.argv`
    //server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['./app/views/*.hbs', './app/modules/**/*.js', './public/js/**/*.js', './public/views/**/*.html'], function () {
        server.notify.apply(server, arguments);
        //server.start();
    });

    //gulp.watch('./bin/www', server.start.bind(server)); //restart my server
});

gulp.task('changes', function(){

})

gulp.task('default', ['serve', 'changes']);