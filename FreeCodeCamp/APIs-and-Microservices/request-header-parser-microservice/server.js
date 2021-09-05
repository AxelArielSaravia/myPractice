// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



//Request Header Parser Microservice
//***************************************************************************//
// 1) A request to /api/whoami should return a JSON object with your IP address in the ipaddress key.
// 2) A request to /api/whoami should return a JSON object with your preferred language in the language key.
// 3) A request to /api/whoami should return a JSON object with your software in the software key.
// e.g. {"ipaddress":"159.20.14.100", "language":"en-US,en;q=0.5", "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}

app.get('/api/whoami', function(req, res){
  res.json({
    ipaddress: req.ip, 
    language: req.get("Accept-Language"),
    software: req.get("User-Agent"),
  });
});

//***************************************************************************//
 


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
