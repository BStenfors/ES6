var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  var schools = [
    {
      name: 'K-State',
      link: '/kstate'
    },
    {
      name: 'Oklahoma State',
      link: '/oklahomastate'
    }
  ];
  var _menuItems = [
    {
      icon: 'home',
      title: 'Home',
      state: 'home'
    },
    {
      icon: 'settings_remote',
      title: 'Channel Guides',
      state: 'channelGuides'
    },
    {
      icon: 'schedule',
      title: 'Schedules',
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
  res.render('index', { title: 'The Playground', tabs: schools, menuItems: _menuItems, adminMenuItems: _adminMenuItems });
});
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
})
module.exports = router;
