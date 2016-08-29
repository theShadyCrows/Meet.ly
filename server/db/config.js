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
    db.knex.schema.createTable('Users', function(user){
      user.increments('id').primary();
      user.string('phoneNumber', 30);
      user.string('email', 100);
      user.timestamps();
    }).then(funtion(table){
      console.log('Created Table', table)
    })
  }
})

db.knex.schema.hasTable('Categories').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('Categories', function(category){
      category.increments('id').primary();
      category.string('name', 200).unique();
      category.timestamps();
    }).then(function(table){
      console.log('Created Table, table')
    })
  }
})

db.knex.schema.hasTable('Auth').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('Auth', function(auth){
      auth.increments('id').primary();
      auth.integer('userId');
      auth.string('username', 200).unique();
      user.string('password', 100);
      auth.timestamps();
    }).then(function(table){
      console.log('Created Table, table')
    })
  }
})

db.knex.schema.hasTable('DefaultParams').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('DefaultParams', function(param){
      param.increments('id').primary();
      param.integer('userId');
      param.string('defaultCat', 200).unique();
      param.string('defaultLoc', 200);
      param.timestamps();
    }).then(function(table){
      console.log('Created Table, table')
    })
  }
})

db.knex.schema.hasTable('SubCategories').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('SubCategories', function(subcategory){
      subcategory.increments('id').primary();
      subcategory.string('name', 200).unique();
      subcategory.integer('subcategoryId');
      subcategory.timestamps();
    }).then(function(table){
      console.log('Created Table, table')
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
