///require///

const express = require("express");
const bodyParser= require("body-parser");


///use///
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



///routes////
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


////server///
app.listen(3000, function(){
    console.log("the server is listening on port 3000");
});