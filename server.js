// modules =================================================
var express = require("express");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
var Yelp = require('yelp');

// var utilAuth = require('./server/lib/utilAuth.js')
var passport = require('passport');

// configuration ===========================================
// Bring in the data model
require('./server/models/db.js');
// Set api router
var apiRouter = require("./server/routes/api.js");
//set port
var port = process.env.PORT || 8888; 
// Bring in the Passport config after model is defined
require('./server/config/passport.js');

/* Initialize the server */
var app = express();
/* Add middleware */
app.use(cors());
app.use(bodyParser.json());

//set static file location
app.use("/", express.static(__dirname + "/client/"));

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// routes ==================================================
/* Authentication Routes */

// app.post("/login", utilAuth.checkPassword);
// app.post("/logout", utilAuth.destroySession);
// app.post("/signup", utilAuth.createUser);

/* API Routes */
app.use("/api", apiRouter);

// start app ===============================================
app.listen(port);
console.log('app started on port: ' + port);
