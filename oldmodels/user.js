var db = require('../db/config.js')

var User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true
})

module.exports = User;


///knex only

// select("id", "name").from("users").where("id", "=", "5")
//
// var User = {
//   findById: function(id){
//     knex("users").select().where("id", "=", "5")
//   }
// }
