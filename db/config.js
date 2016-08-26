var path = require('path');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'meet',
    charset: 'utf8'
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('Users').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('Users', function(){
      user.id
    })
  }
})

// var connection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'meet'
// })
//
// connection.connect();
//
// module.exports = connection;

module.exports = db;

//https://www.npmjs.com/package/bookshelf
