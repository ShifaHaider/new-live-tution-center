var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5000kb'}));
var connection  = require('./connection');
var schema = require('./schema');
var UserModel = schema.UserModel;
var classSchema = require('./schema2');
var ClassModel = classSchema.ClassModel;


app.post('/user-post', function (req, res) {
    console.log(req.body);
    var user = new UserModel(req.body);
    user.save(function (error, data) {
        res.send(data);
        console.log(data);
    });
});
app.post('/create-class', function (req, res) {
    console.log(req.body);
    var classModel = new ClassModel(req.body);
    classModel.save(function (error, data) {
        console.log(error , data , 23424);
        res.send(data);
    });
});

app.get('/classes', function (req, res) {
    ClassModel.find().exec((error , data)=>{
        console.log(error , data ,66666);
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