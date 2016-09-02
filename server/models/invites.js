var mongoose = require( 'mongoose' );

var inviteSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'active' //active, closed. change to Boolean?
  },
  eventName: String,
  date: Date,
  time: String, //change type to Date? combine with date field?
  location: String,
  category: String,
  type: Array,  
  friends: Array
});

inviteSchema.methods.setFriends = function(friendsOrig){
  var string = friendsOrig[0]; 
  var splitArray = string.split(',');  
  this.friends = splitArray;
};


mongoose.model('Invite', inviteSchema);