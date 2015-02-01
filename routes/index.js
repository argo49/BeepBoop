var app        = require('../app');
var Cleverbot  = require('cleverbot-node');
var sentiment  = require('../js/sentiment');
var soundcloud = require('soundcloud');
var jQuery     = require('jquery');
var unirest    = require("unirest");


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
    /*var reqString = req._parsedUrl.query.substring(1, req._parsedUrl.query.length);
    var reqString = reqString.split('+');*/
    var url = "https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-text/?text=" + req.query;

    unirest.get(url) // unirest NLP request
    .header("X-Mashape-Key", "gV0cBZ0GATmshi87OTv5T1dh8Awwp15hBQUjsn1kGj9IzBX7RD")
    .header("Accept", "application/json")
    .end(function (result) {

        // console.log(result.status, result.headers, result.body);

        retrievedSentiment = sentiment.getSentiment(result.body);

        //retrievedSentiment is what we want ot give to the soundcloud here

        var clientID = '9668f704e0bc2604f64e8b778c9f05d0'
        var url = 'https://api.soundcloud.com/tracks.json?client_id='+clientID+'&tags='+retrievedSentiment+'&order=hotness';

        unirest
            .get(url)
            .end(function (tracks) {
                res.send(tracks.body[0]);
            });
    });

}

routes.edison = function (req, res) {
    console.log(req.query);
    // temp
    // light
    // sound

    res.send("Hello");
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
