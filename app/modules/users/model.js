/**
 * Created by bstenfors on 8/4/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String
});

module.exports = mongoose.model('User', UserSchema);