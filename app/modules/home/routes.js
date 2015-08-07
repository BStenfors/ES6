var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Playground' });
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
