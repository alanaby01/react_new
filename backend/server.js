var http = require('http'); // 1 - Import Node.js core module

var server = http.createServer(function (req, res) {   // 2 - creating server

    //handle incoming requests here..
    console.log(req);
});

server.listen(4000); //3 - listen for any incoming requests

console.log('Node.js web server at port 4000 is running..')