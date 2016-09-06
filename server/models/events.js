var mongoose = require( 'mongoose' );
var _ = require('underscore');

var eventSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'active' //active, expired
  },
  eventName: String,
  date: Date,
  time: String, //change type to Date? combine with date field?
  location: String,
  category: String,
  type: Array,  
  friends: Array //this should be changed to emails
});



mongoose.model('Event', eventSchema);