var app       = require('../app');
var app2      = require('unirest');
var Cleverbot = require('cleverbot-node');
<<<<<<< HEAD
var sentiment = require('../js/sentiment');
var soundcloud = require('soundcloud');
var jquery = require('jquery');
=======
var unirest   = require("unirest");
>>>>>>> 3e67f21cf0e5424510ce81c464c8c1acd3fa77dd

// Create one global cleverbot for the server
    var marvin = new Cleverbot();
    function callback(resp){
        marvin.write(resp['message'], callback);
        console.log(resp['message']);
    }
// End Cleverbot instantiation

var routes = {};

// GET home page
routes.index = function (req, res) {
    res.render('index.ejs', {ejsData:'EJS is working!'});
};

//GET the sentiment from a page
routes.sentiment = function(req, res){
    //get the request string as an array
    
    console.log(req._parsedUrl.query)
    var reqString = req._parsedUrl.query.substring(1, req._parsedUrl.query.length);
    var reqString = reqString.split('+');
    var url= "https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-text/?text=";
    reqString.forEach(function(value){
    url = url + "+" + value
    });


    app2.get(url) //unirest
    .header("X-Mashape-Key", "gV0cBZ0GATmshi87OTv5T1dh8Awwp15hBQUjsn1kGj9IzBX7RD")
    .header("Accept", "application/json")
    .end(function (result) {
          console.log(result.status, result.headers, result.body);
       // console.log(url)
          res.send(result)
          retrievedSentiment = sentiment.getSentiment(result);
          
          //retrievedSentiment.mood is what we want ot give to the soundcloud here

          /*
            var clientID = '9668f704e0bc2604f64e8b778c9f05d0'
            var url = 'https://api.soundcloud.com/tracks.json?client_id='+clientID+'&tags='+sentiment+'&order=hotness';

            $.getJSON(url, function(tracks) {

                console.log(tracks)

                var keys = Object.keys( tracks );

                var track = keys[Math.floor(Math.random()*tracks.length)];

                var track = track.permalink_url



              $(tracks).each(function(track) {
                console.log(track.title);
              });


          */


    
    });

}

routes.cleverbot = function (req, res) {
    marvin.write(req.query.text, function (response) {
        res.json(response);
    });
}


// GET normalize.css
routes.normalizecss = function (req, res) {
    res.sendfile(app.get('node_modules') + '/normalize.css/normalize.css');
};

// GET 404 page
routes.fileNotFound = function (req, res) {
    res.render('status/404.ejs');
};

module.exports = routes;
