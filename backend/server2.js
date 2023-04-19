const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

var url = "mongodb://localhost:27017/student";
const dbName = 'student';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
var client;

var dbSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var User = mongoose.model("User", dbSchema);

async function main() {
    client = await MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if (error) {
          return console.log("Connection failed for some reason");
        }
        console.log("Connection established - All well");
      });
}
main()
    .then(console.log)
    .catch(console.error)

async function createStudent(client_local, data){
    result = await client_local.db("student").collection("profile").insertOne(data);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function readStudentbyName(client_local, data) {
    var result = await client_local.db("student").collection("profile").findOne({name : data});
    if (result) {
        console.log(`Found a listing in the collection with the name '${data}':`);
    } else {    
        console.log(`No listings found with the name '${data}'`);
    }
    return result;
};

app.post('/', (req, res) => {
    var myObj = req.body;
    createStudent(client, myObj);
    res.setHeader('Content-Type', 'text/html');
    res.send('Hello');
    res.end();
});

app.post('/read-student',(req, res)=> {
    var myObj2 = req.body;
    console.log(myObj2);
    const data = readStudentbyName(client, myObj2.name)
    .then((value) => {
        console.log(value);
        res.setHeader('Content-Type', 'application/json');
        res.send({ name: 'user created in db' })
    })
    .catch((err) => {
        res.status(400).send({ err });
    });
    console.log(data);
});
 
app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});