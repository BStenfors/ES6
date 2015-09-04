var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');
var menuItem = mongoose.model('MenuItem');

/* GET home page. */
router.get('/', function(req, res, next) {
  var loggedIn = false;
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

  menuItem.find({}, function(err, docs){
    console.log('Menu items err: ' + err);
    console.log('Menu Items docs: ' + docs);
    for(var idx in docs){
      _menuItems.push(docs[idx]._doc);
    }

  });

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
  if(!loggedIn){
    res.render('login', { title: 'Please Login to the Playground' });
  }else{
    res.render('index',
        {
          title: 'The Playground',
          tabs: schools,
          menuItems: _menuItems,
          adminMenuItems: _adminMenuItems
        }
    );
  }
});

//Account / User Routes
router.post('/login', function(req, res, next){
  console.log('Trying to log in.');
  passport.authenticate('local',
      {
        successRedirect: '/',
        failureRedirect: '/login'
      }
  )
});

router.get('/register', function(req,res,next){
  res.render('register', {title: 'Register for the Playground'});
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
