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
    const result = await client_local.db("student").collection("profile").insertOne(data);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

app.post('/', (req, res) => {
    var myObj = req.body;
    createStudent(client, myObj);
})
 
 
app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});