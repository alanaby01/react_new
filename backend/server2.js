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
var client, result;

var dbSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

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
}

async function readStudentbyName(client_local, data) {
    result = await client_local.db("student").collection("profile").findOne({name : data});
    if (result) {
        console.log(`Found a listing in the collection with the name '${data}':`);
        console.log(result);
    } else {    
        console.log(`No listings found with the name '${data}'`);
    }
}

app.post('/', (req, res) => {
    var myObj = req.body;
    createStudent(client, myObj);
})

app.post('/read-student',(req, res)=> {
    var myObj2 = req.body;
    readStudentbyName(client, myObj2.name);
    
    res.setHeader('Content-Type', 'application/json');
    res.send({ name: 'user created in db' });
})
 
app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});