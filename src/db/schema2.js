var mongoose = require("mongoose");


var ClassSchema = new mongoose.Schema({
    title: {type: String , required: true},
    description: {type: String , required: true},
    recurringStatus: {type: String , required: true},
    // days: {type: Array , required: true},
    fee: {type: Number , required: true},
    subject: {type: String , required: true},
    startTime: {type: String , required: true},
    endTime: {type: String , required: true},
    createdAT: {type: Number , default: Date.now()},
    userID: {type: String , required: true},
    studentsID: {type: Array , default: []},
}, {minimize: false});

exports.ClassModel = mongoose.model('classes' , ClassSchema);