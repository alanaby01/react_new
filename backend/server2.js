const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.post('/', (req, res) => {
    let data = req.body;
    res.send('Data Received: ' + JSON.stringify(data));
    console.log(data);
})
 
 
app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
})