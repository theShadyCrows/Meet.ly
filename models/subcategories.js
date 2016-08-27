var db = require('../db/config.js')

var SubCategories = db.Model.extend({
  tableName: 'SubCategories',
  hasTimestamps: true
})

module.exports = SubCategories;
