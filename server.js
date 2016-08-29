// modules =================================================
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
var Yelp = require('yelp');
var db = require('./server/db/config.js');

// configuration ===========================================
//Separate router for /api requests 
var apiRouter = require("./server/api.js");
//set port
var port = process.env.PORT || 8888; 


/* Initialize the server */
var app = express();
/* Add middleware */
app.use(cors());
app.use(bodyParser.json());
// app.use(session({
//   secret: "MKS464LYFE",
//   resave: false,
//   saveUninitialized: true
// }));

//set static file location
app.use("/", express.static(__dirname + "/client/"));

// routes ==================================================
app.use("/api", apiRouter);

// start app ===============================================
app.listen(port);
console.log('app started on port: ' + port);
