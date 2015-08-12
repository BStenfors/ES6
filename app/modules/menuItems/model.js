/**
 * Created by bstenfors on 8/4/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
    label: String,
    icon: String,
    state: String
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);