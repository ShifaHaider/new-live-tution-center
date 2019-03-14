var mongoose = require("mongoose");

var uri = "mongodb+srv://shifa:hello1@kutta-pgudg.gcp.mongodb.net/test?retryWrites=true";

mongoose.connect(uri , {useNewUrlParser: true});

var db = mongoose.connection;


db.on('error' , function (error) {
    console.log(error);
});
db.on('open' , function () {
    console.log('Open');
});