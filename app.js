var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose   = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//models
var user = require('./app/modules/users/model');
var menuItem = require('./app/modules/menuItems/model');

//route files
var routes = require('./app/modules/home/routes');
var users = require('./app/modules/users/routes');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer());
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
console.log(path.join(__dirname, 'jspm_packages'));
app.use("/jspm_packages", express.static(path.join(__dirname, 'jspm_packages')));
app.use("/stylesheets",express.static(path.join(__dirname, 'stylesheets')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);



// passport config
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//DB configuration

mongoose.connect('mongodb://localhost:27017/researchDev', function(err, db){
  if(!err){
    console.log('We are connected to researchDev!');
  }
});

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  //var err = new Error('Not Found');
  err.status = 404;
  console.log(err.stack);
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.stack);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.stack);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
