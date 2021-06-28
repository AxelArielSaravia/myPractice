'use strict'
// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... hahahah soo funy
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Timestamp Microservice
//***************************************************************************//
// 1) A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds
// 2) A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
// 3) A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// 4) Your project can handle dates that can be successfully parsed by new Date(date_string)
// 5) If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }
// 6) An empty date parameter should return the current time in a JSON object with a unix key
// 7) An empty date parameter should return the current time in a JSON object with a utc key

app.get('/api/:date?', function(req, res){
  let paramDate = req.params.date;
  let date;

  //validations
  if( paramDate === undefined ) date = new Date();
  else if( /^-?\d+$/.exec(paramDate) ) date = new Date( parseInt(paramDate) );
  else date = new Date(paramDate);

  //validation response
  if(date.toString() === "Invalid Date") res.json({ error: date.toString()});
  else res.json({ unix: date.getTime(), utc: date.toUTCString() });

});
//***************************************************************************//


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});