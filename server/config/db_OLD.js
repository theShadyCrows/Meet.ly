// https://www.npmjs.com/package/bookshelf


//intialize the client in this module

var knex = require('knex')(config);
module.exports = require('bookshelf')(knex);

var db = require(./config.js)
//acess to exported db
