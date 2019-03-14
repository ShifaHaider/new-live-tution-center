var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true},
    picture: {type: String , required: true},
    phone: {type: String , required: true},
    createdAT: {type: Number , default: Date.now()},
    _id: {type: String , required: true},

}, {minimize: false});

exports.UserModel = mongoose.model('users' , UserSchema);


