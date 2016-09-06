var db = require('../db/config.js')

var Auth = db.Model.extend({
  tableName: 'Auth',
  hasTimestamps: true
})

module.exports = Auth;
