// Exercise Tracker
//***************************************************************************//
// 1) You can POST to /api/users with form data username to create a new user. The returned response will be an object with username and _id properties.
// 2) You can make a GET request to /api/users to get an array of all users. Each element in the array is an object containing a user's username and _id.
// 3) You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user. 
//    The returned response will be the user object with a log array of all the exercises added. 
//    Each log item has the description, duration, and date properties.
// 4) A request to a user's log (/api/users/:_id/logs) returns an object with a count property representing the number of exercises returned.
// 5) You can add from, to and limit parameters to a /api/users/:_id/logs request to retrieve part of the log of any user. 
//    from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();


//************************* DATA BASE CONNECTION *************************//

//mongoose connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Mongo!!, we are connect") );


//create an schema
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: []
});

//create the model
const user = mongoose.model("user", userSchema);


//************************* Basic Configuration *************************//
app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use( function( req, res, next ){
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})


//************************* APP *************************//

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

 
app.route('/api/users')
.get(( req, res ) => {
  user.find().select('_id username __v').exec(( err, docs ) => {
    if( !err ) res. json( docs );
    else res.json( err );
  });
})
.post( async ( req, res, next ) => {
  try{
    let username = req.body.username;
    if( username === "" ) return res.send("You don't create any user");

    let doc = await user.findOne({ username: username })
    if( doc ) return res.json("Username already taken");
    doc =  new user({ username: username });
    doc.save();

    res.json({ username: doc.username, _id: doc._id });
  }
  catch( err ){
    console.error(err)
    next();
  }
});


app.post('/api/users/:_id/exercises', ( req, res ) => {
 
  if( req.body[":_id"] === "" ) res.send("Path `id` is required");
  if( req.body.description === "" ) res.send("Path `description` is required");
  if( req.body.duration === "") res.send("Path `duration` is required");

  let id = req.body[":_id"],
  description = req.body.description,
  duration = parseInt(req.body.duration),
  date;
 
  ( req.body.date === "" ) ? date = new Date().toDateString() : date = new Date(req.body.date).toDateString();

  //session object
  let newSession = {
    description: description,
    duration: duration,
    date: date
  };

  user.findByIdAndUpdate(id, {$push: {log: newSession}}, {new: true, useFindAndModify: false}, ( err, updateDoc ) => {
    if( err ) return res.send("The id doesn't exist");
    else res.json({
      _id: updateDoc._id,
      username: updateDoc.username,
      date: newSession.date,
      duration: newSession.duration,
      description: newSession.description
    });
  });
});


app.get('/api/users/:_id/logs', ( req, res, next) => {

  let id = req.params._id;

  user.findById(id).exec(( err, doc ) => {
    if( err ) return res.send("The id doesn't exist");

    //menssage
    let resObj = {
      _id: doc._id,
      username: doc.username,
      count: null,
      log: doc.log
    };

    //query limit
    if( req.query.limit ) resObj.log = resObj.log.slice(0, req.query.limit);

    //guery from or to
    if( req.query.from || req.query.to ){
      let dateFrom, dateTo;

      if( req.query.from ) dateFrom = Date.parse(req.query.from);
      if( req.query.to ) dateTo = Date.parse(req.query.to);

      resObj.log = resObj.log.filter( session => {
        sessionDate = Date.parse(session.date);
        return dateFrom <= sessionDate && sessionDate <= dateTo;
      });
    }

    resObj.count = resObj.log.length;
    res.json(resObj);
  });
});

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
