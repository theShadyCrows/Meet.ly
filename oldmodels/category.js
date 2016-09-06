var db = require('../db/config.js')

var Category = db.Model.extend({
  tableName: 'Categories',
  hasTimestamps: true
})

module.exports = Category;
