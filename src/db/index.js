var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5000kb'}));
var connection = require('./connection');
var schema = require('./schema');
var UserModel = schema.UserModel;
var classSchema = require('./schema2');
var ClassModel = classSchema.ClassModel;


app.post('/user-post', function (req, res) {
    var user = new UserModel(req.body);
    user.save(function (error, data) {
        res.send(data);
    });
});

app.post('/create-class', function (req, res) {
    var classModel = new ClassModel(req.body);
    classModel.save(function (error, data) {
        // console.log(error, data);
        res.send(data);
    });
});

app.post('/update-class', function (req, res) {
    ClassModel.updateOne({_id: req.body._id}, {studentsID: req.body.studentsID}, function (err, data) {
        // console.log(err, data);
        res.send(data);
    })
});

app.post('/view-class', function (req, res) {

    ClassModel.findOne({_id: req.body.classID} , function (err, data) {
        console.log(err, data);
        res.send(data);
    })
});


app.get('/classes', function (req, res) {
    ClassModel.find().exec((error, data) => {
        // console.log(error, data);
        res.send(data);
    });
});

app.get('/create-class', function (req, res) {
    res.send('Create Class');
});


app.set('port', process.env.PORT || 9000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});