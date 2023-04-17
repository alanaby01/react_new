const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const MongoClient = require('mongodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

var dbSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

// async function main(){
//     const uri = "mongodb+srv://alanaby01:<password>@cluster0.vtygeom.mongodb.net/test"
//     const client = new MongoClient(uri);
//     try {
//         Connect to the MongoDB cluster
//         await client.connect();
 
//         Make the appropriate DB calls
//         await  listDatabases(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// main().catch(console.error);

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

var User = mongoose.model("User", dbSchema);

app.post('/', (req, res) => {
    let data = new User(req.body);
    console.log(req.body)
    data.save()
    .then(item => {
        res.send("Item stored to MongoDB");
        console.log("Item stored to MongoDB")
    })
    .catch(err => {
        res.status(400).send("Unable to send to database");
        console.log("Error");
    })
})
 
 
app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});