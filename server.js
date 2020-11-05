var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(8080);

var twitter = require('twitter');
var twitterkey = require('./twitterkey.json')

var client = new twitter({
  consumer_key: twitterkey.consumer_key,
  consumer_secret: twitterkey.consumer_secret,
  access_token_key: twitterkey.access_token_key,
  access_token_secret: twitterkey.access_token_secret
});

app.get('/getlocation', function(req, res) {
  var lat = req.query.lat;
  var long = req.query.long;
  client.get('trends/closest', {lat: lat, long: long}, function(error, body, response) {
    var woeid = body[0].woeid;
    var name = body[0].name;
    console.log(name);
    client.get('trends/place', {id: woeid}, function(error, body, response) {
      var trends = body[0].trends
      for (i=0; i < trends.length; i++) {
        console.log(trends[i].name);
      };
    });
  });
});
