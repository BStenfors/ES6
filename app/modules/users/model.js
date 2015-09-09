/**
 * Created by bstenfors on 8/4/2015.
 */
var mongoose = require('mongoose');
var hash = require('password-hash');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    theme: String
});

UserSchema.plugin(passportLocalMongoose);

//UserSchema.statics.authenticate = function(email, password, callback){
//    this.findOne({ email: email }, function(error, user) {
//        if (user && Hash.verify(password, user.password)) {
//            callback(null, user);
//        } else if (user || !error) {
//            // Email or password was invalid (no MongoDB error)
//            error = new Error("Your email address or password is invalid. Please try again.");
//            callback(error, null);
//        } else {
//            // Something bad happened with MongoDB. You shouldn't run into this often.
//            callback(error, null);
//        }
//    });
//};

module.exports = mongoose.model('User', UserSchema);