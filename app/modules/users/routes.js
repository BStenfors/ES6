/**
 * Created by bstenfors on 8/4/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

//// middleware specific to this router
//router.use(function timeLog(req, res, next) {
//    console.log('Time: ', Date.now());
//    next();
//});

//users routes
//router.get('/',function(req,res,next){
//   res.send('Users page');
//});

router.route('/')
    .all(function(req, res, next) {
       // runs for all HTTP verbs first
       // think of it as route specific middleware!
       next();
    })
    .get(function(req, res) {

    })
    .post(function(req, res){
        var newUser = new user();
        console.log(req.body);
        newUser.name = req.body.name;
        newUser.email = req.body.email;

        newUser.save(function(err){
            if(err){
                res.send(err);
            }else{
                res.json({message: 'User Created!'});
            }
        })
    });
module.exports = router;