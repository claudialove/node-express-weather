///require///
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

///use///
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

///routes////
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    ///break-down the "bringing in the api" query////
    ///only the query variable is now the user input
    const query = req.body.cityName;
    const key = "510f5ff0cb0a45dc6e2c8d7c150ce80e";
    const units = "imperial";
    ///bring in that api/////
    const url = 
    "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + units;
    https.get(url, function (response) {
        console.log(response.statusCode);

        //////parse that json//////
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = Math.floor(weatherData.main.temp);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherDescription);

            ////display data on the site/////
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Farenheit.</h1>");
            res.write("<p>The conditions are: " + weatherDescription + ". </p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});


////server///
app.listen(3000, function () {
    console.log("the server is listening on port 3000");
});

  