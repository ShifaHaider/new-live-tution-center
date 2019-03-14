var mongoose = require("mongoose");


var ClassSchema = new mongoose.Schema({
    title: {type: String , required: true},
    description: {type: String , required: true},
    gender: {type: String , required: true},
    // days: {type: Array , required: true},
    fee: {type: Number , required: true},
    subject: {type: String , required: true},
    // endTime: {type: String , required: true},
    createdAT: {type: Number , default: Date.now()},
    // startTime: {type: String , required: true},
    userID: {type: String , required: true},

}, {minimize: false});

exports.ClassModel = mongoose.model('classes' , ClassSchema);