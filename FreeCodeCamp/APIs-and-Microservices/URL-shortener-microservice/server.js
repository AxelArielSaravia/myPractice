//URL Shortener Microservice
//***************************************************************************//
// 1) You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
// 2) When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
// 3) If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }
// HINT: Do not forget to use a body parsing middleware to handle the POST requests. Also, you can use the function dns.lookup(host, cb) from the dns core module to verify a submitted URL.


require('dotenv').config();

const express = require('express');
const dns = require('dns');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//************************* DATA BASE CONNECTION *************************//

//mongoose connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Mongo!!, we are connect") );


//create an schema
const urlSchema = new mongoose.Schema({
  address:{type: String, required: true},
  original_url: {type: String, required: true},
  short_url: {type: Number, required: true}
});
//create the model
const urls = mongoose.model("urls", urlSchema);


//************************* Basic Configuration *************************//
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());


app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



//************************* VALIDATE FUNCTIONS *************************//
//validate URL
const validateUrl = (url) => {
  const regExpValid = /^http(?:s)?:\/\/(?:[a-z0-9](?:-)*)*[a-z0-9]+.(?:[a-z0-9](?:-)*)*[a-z0-9]+.[a-z0-9]{2,}$/;  
  if( regExpValid.test(url) ) return true;
  else return false;
}

//validate DNS
const validUrlDNS = (url) => {
  const reqExpDNS = /(?:[a-z0-9](?:-)*)*[a-z0-9]+.[a-z0-9]{2,}$/;
  let validurl = reqExpDNS.exec(url);
  return validurl[0];
}


//************************* DATA BASE HANDLER *************************//
const findOne = async (filter, url) => {
  try{
    let doc = await urls.findOne({[filter]: url});
    if( doc ) return doc;
    else return false;
  }
  catch (err){
    return err;
  }
}

const createOne = async (address, url) => {
  try{

    let short = await urls.findOne({}).sort({short_url: 'desc'}).exec();

    let doc = new urls({
      address: address,
      original_url: url,
      short_url: short.short_url + 1
    });
    await doc.save();
    if( doc ) return doc;
  }
  catch (err){
    return err;
  }
}


//************************* POST request *************************//
app.post('/api/shorturl', function( req, res, next ){
  let url = req.body.url;
  if( url.endsWith("/") ) url = url.substring(0, url.length - 1 );
  
  //if the url is invalid
  if( !validateUrl(url) ) return res.status(401).json({error: 'invalid url'});

  //transform the url to valid URL DNS
  let validUrl = validUrlDNS(url);

  //validate Domain Name System
  //we need to validate that the url is a real domain
  dns.lookup(validUrl, async (err, address) => {
    if (err) res.json({error: "Invalid Hostname"});
    else{
      try{
        let doc = await findOne("original_url", url);
        if( !doc ) doc = await createOne(address, url);
        res.json({original_url: doc.original_url, short_url: doc.short_url});
      }
      catch (err){
        console.error(err);
        res.status(500).json('Server error');
      }
    }
  });
});


//************************* GET request *************************//
app.get('/api/shorturl/:num?', async function( req, res ){
  try{
    let num = req.params.num;
    let doc = await findOne("short_url", num);

    if( doc ) res.redirect(doc.original_url);//redirect to the page settier
    else res.redirect('../../../');
  }
  catch (err){
    console.error(err);
    res.status(500).json('Server error');
  }
});


//server listen
const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Listening on port ${port}`) );