var passport = require('passport');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');
var menuItem = mongoose.model('MenuItem');


/* GET home page. */
router.get('/', function(req, res, next) {
  var loggedIn = false;
  console.log('Index Request');

  //If user is not authenticated redirect the user to the login view
  var loggedIn = req.isAuthenticated();
  if(loggedIn)
  {
    if(typeof req.user != 'undefined' && req.user != null){
      console.log(req.user.username + ' Logged in: ' + req.isAuthenticated());
    }

    //If user is authenticated render the index view
    var schools = [
      {
        name: 'Big 12',
        confId: 1,
        route: '#/conference/1'
      },
      {
        name: 'SEC',
        confId: 2,
        route: '#/conference/2'
      }
    ];
    var _menuItems = [
      {
        icon: 'home',
        label: 'Home',
        state: 'home'
      },
      {
        icon: 'settings_remote',
        label: 'Channel Guides',
        state: 'channelGuides'
      },
      {
        icon: 'schedule',
        label: 'Schedules',
        state: 'schedules'
      }
    ];
    var _adminMenuItems = [
      {
        icon: 'menu',
        title: 'Menu Items',
        state: 'adminMenuItems'
      },
      {
        icon: 'school',
        title: 'Schools',
        state: 'schools'
      }
    ];

    //menuItem.find({}, function(err, docs){
    //  //console.log('Menu items err: ' + err);
    //  if(docs != null){
    //    console.log('Menu Items docs: ' + docs);
    //    for(var idx in docs){
    //      _menuItems.push(docs[idx]._doc);
    //    }
    //  }
    //});
    console.log('next line is rendering the index');
    res.render('index',
        {
          title: 'The Playground',
          tabs: schools,
          menuItems: _menuItems,
          adminMenuItems: _adminMenuItems,
          user: req.user,
          authenticated: req.isAuthenticated()
        }
    );
  }
  else
  {
    res.render('login');
  }
});

//Account / User Routes
//router.post('/login', function(req, res, next){
//  passport.authenticate('local',
//      function (err, user, inf) {
//        if (!err) {
//          res.status(200).redirect('/');
//        }
//      }
//  )(req, res, next);
//});
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.status(200).redirect('/');
});

router.get('/index/:username', function(req, res, next){
  res.render('index');
});

//router.post('/login', passport.authenticate('local'), function(req, res, next) {
//  //res.json({user: req.user, loggedIn: true});
//  var schools = [
//    {
//      name: 'Big 12',
//      confId: 1,
//      route: '#/conference/1'
//    },
//    {
//      name: 'SEC',
//      confId: 2,
//      route: '#/conference/2'
//    }
//  ];
//  var _menuItems = [
//    {
//      icon: 'home',
//      label: 'Home',
//      state: 'home'
//    },
//    {
//      icon: 'settings_remote',
//      label: 'Channel Guides',
//      state: 'channelGuides'
//    },
//    {
//      icon: 'schedule',
//      label: 'Schedules',
//      state: 'schedules'
//    }
//  ];
//  var _adminMenuItems = [
//    {
//      icon: 'menu',
//      title: 'Menu Items',
//      state: 'adminMenuItems'
//    },
//    {
//      icon: 'school',
//      title: 'Schools',
//      state: 'schools'
//    }
//  ];
//
//  res.render('index',
//      {
//        title: 'The Playground',
//        tabs: schools,
//        menuItems: _menuItems,
//        adminMenuItems: _adminMenuItems
//      }
//  );
//});

router.get('/login', function(req, res, next){
  console.log('Login Request');
  res.redirect('/');
});

router.get('/register', function(req,res,next){
  res.render('register', {title: 'Register for the Playground'});
});

router.post('/registerNewUser', function(req, res, next){
  console.log(req.body);
  user.register(new user({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { user : user });
    }
    console.log('New user: ' + req.body.username);
    passport.authenticate('local')(req, res, function () {
      res.redirect('/index/' + req.user.username);
    });
  });
});

router.post('/createUser', function(req, res, next){
  var newUser = new user();
  console.log(req.body);
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  newUser.save(function(err){
    if(err){
      res.send(err);
      console.log('Error creating user: ' + err);
    }else{
      console.log('User created!');
      res.json({success: 'true'});
    }
  })
});
//Account / User Routes

router.get('/usersList',function(req, res, next){
  user.find({}, function(err, docs){
    console.log(docs);
    res.send(docs);
  })
});

router.put('/userDelete', function(req, res, next){
  user.findOne({ _id: req.body._id }).remove( function(err, removed){
    if(err){
      res.send(err);
    }else{
      res.json({removed: removed.result.ok});
    }
  });
});

router.post('/addMenuItem', function(req, res, next){
  var newMenuItem = new menuItem();
  console.log(req.body);
  newMenuItem.label = req.body.label;
  newMenuItem.icon = req.body.icon;
  newMenuItem.state = req.body.state;

  newMenuItem.save(function(err){
    if(err){
      res.send(err);
    }else{
      res.json({message: 'Menu Item Created!'});
    }
  });
});

module.exports = router;
