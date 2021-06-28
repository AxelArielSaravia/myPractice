'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


const app = express();


//mongoose connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//schema of mongoose
const { Schema } = mongoose;

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

//create a moodel of the schema
const Person = mongoose.model("Person", personSchema);


/**
 * Within the createAndSavePerson function, create a document instance using the Person model constructor you built before. 
 * Pass to the constructor an object having the fields name, age, and favoriteFoods. 
 * Their types must conform to the ones in the personSchema. 
 * Then, call the method document.save() on the returned document instance. 
 * Pass to it a callback using the Node convention. 
*/
const createAndSavePerson = (done) => {
    let axelSar = new Person({
        name:"Axel", 
        age:23, 
        favoriteFoods:["egg","fish","potatos","bananna","all"]
    });
    
    axelSar.save(function(err, data) {
        if( err ) return console.error(err);
        done(null, data);
    });
};


/**
 * Modify the createManyPeople function to create many people 
 * using Model.create() with the argument arrayOfPeople.
*/
let arrayOfPeople = [
    {name: "Fede", age: 26, favoriteFoods: ["Del Taco"]},
    {name: "Juan", age: 24, favoriteFoods: ["roast chicken"]},
    {name: "Hernan", age: 23, favoriteFoods: ["wine"]},
    {name: "Matias", age: 24, favoriteFoods:["milanguesas"]}
];

const createManyPeople = (arrayOfPeople, done) => {

    Person.create(arrayOfPeople, function(err, people){
        if( err ) return console.log( err );
        done( null, people );
    });

};

/**
 * Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]
 * Use the function argument personName as the search key.
*/
const findPeopleByName = (personName, done) => {
    Person.find({name:personName}, function(err, personFound){
        if( err ) return console.error( err );
        done(null, personFound);
    });
};

/**
 * Modify the findOneByFood function to find just one person which has a certain food in the person's favorites, 
 * using Model.findOne() -> Person. 
 * Use the function argument food as search key.
*/
const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, function( err, docFound ){
        if( err )return console.error( err );
        done( null, docFound );
    });
};

/**
 * Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. 
 * Use the function argument personId as the search key.
*/
const findPersonById = (personId, done) => {
    Person.findById( {_id: personId}, function(err, people){
        if( err ) return console.error( err );
        done( null, people );
    });
};

/**
 * Modify the findEditThenSave function to find a person by _id (use any of the above methods) 
 * with the parameter personId as search key. 
 * Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()). 
 * Then - inside the find callback - save() the updated Person.
*/
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById( personId, function(err, person){
        if( err ) return console.error( err );
        
        person.favoriteFoods.push(foodToAdd);

        person.save((err, updatePerson) => {
            if( err ) return console.error( err );
            done( null, updatePerson );
        });
    });
};

/**
 * Modify the findAndUpdate function to find a person by Name and set the person's age to 20. 
 * Use the function parameter personName as the search key.
*/
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: True}, function( err, person ){
        if( err ) return console.error( err );
        done( null, person );
    });
};

/**
 * Modify the removeById function to delete one person by the person's _id. 
 * You should use one of the methods findByIdAndRemove() or findOneAndRemove().
*/
const removeById = (personId, done) => {
    Person.findByIdAndDelete( personId, ( err, person ) => {
        if( err ) return console.error( err );
        done( null, person );
    });
};


/**
 * Modify the removeManyPeople function to delete all the people 
 * whose name is within the variable nameToRemove, using Model.remove(). 
 * Pass it to a query document with the name field set, and a callback.
*/
const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    Person.remove({name: nameToRemove}, (err, done) => {
        if( err ) return console.log( err );
        done( null, person );
    });
};


/**
 * Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. 
 * Sort them by name, limit the results to two documents, and hide their age. 
 * Chain .find(), .sort(), .limit(), .select(), and then .exec(). 
 * Pass the done(err, data) callback to exec().
*/
const queryChain = (done) => {
    const foodToSearch = "burrito";

    Person.find({favoriteFoods: foodToSearch})
    .sort("name")
    .limit(2)
    .select("name favoriteFoods")
    .exec((err, personFound) => {
        if( err ) return console.error( err );
        done( null, personFound );
    });
};


app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use( '/public', express.static(__dirname + '/public') );

app.get('/', function( req, res ){
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

module.exports = app;