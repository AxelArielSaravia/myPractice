'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//enviroment variables
process.env.MESSAGE_STYLE="uppercase";

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({extended: false}) );

// use the console
//console.log("hello world"); 

/***************
 * Specifies the root directory from which to serve static assets
 * can load the files that are in the public directory
*/
app.use( '/public', express.static(__dirname + '/public') );

/***************
 * Build a simple logger. 
 * For every request, it should log to the console a string taking the following 
 * format: method path - ip. 
*/
app.use( function( req, res, next ){
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})



app.get('/', function( req, res ){
    //the server response "Hello Express"
    //res.send("Hello Express");

    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.get( '/json', function( req, res ){
    //This method sends a response (with the correct content-type) 
    //that is the parameter converted to a JSON string using JSON.stringify().
    
    let message = "Hello json";
    //if env var X is the same as "uppercase", then convert all to uppercase
    if( process.env.MESSAGE_STYLE === "uppercase" ){
        message = message.toUpperCase();
    }

    res.json({ "message": message });
});

/***************
 * In the route app.get('/now', ...) chain a middleware function and the final handler. 
 * In the middleware function you should add the current time to the request object in the req.time key. 
 * You can use new Date().toString(). 
 * In the handler, respond with a JSON object, taking the structure {time: req.time}.
*/
app.get('/now', function( req, res, next ){
    req.time = new Date().toString();
    next();
}, function( req, res ){
    res.json( { time: req.time } );
});

/***************
 * Build an echo server, mounted at the route GET /:word/echo. 
 * Respond with a JSON object, taking the structure {echo: word}. 
*/
app.get('/:word/echo', function( req, res ){
    res.json( { echo: req.params.word } )
});

/***************
 * Build an API endpoint, mounted at GET /name. Respond with a JSON document, 
 * taking the structure { name: 'firstname lastname'}. 
 * The first and last name parameters should be encoded in a query string e.g. ?first=firstname&last=lastname.
 * Note: In the following exercise you are going to receive data from a POST request, at the same /name route path. 
 * If you want, you can use the method app.route(path).get(handler).post(handler). 
 * This syntax allows you to chain different verb handlers on the same path route. 
 * You can save a bit of typing, and have cleaner code.
*/
app.route('/name')
.get( function( req, res ){
    res.json( { name: `${req.query.first} ${req.query.last}`} );
})
.post( function( req, res ){

    res.json( { name: `${req.body.first} ${req.body.last}`} );
});

module.exports = app;