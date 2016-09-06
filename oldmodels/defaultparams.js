var db = require('../db/config.js')

var DefaultParams = db.Model.extend({
  tableName: 'DefaultParams',
  hasTimestamps: true
})

module.exports = DefaultParams;
