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
  friends: Array //this should be changed to emails
});

inviteSchema.methods.setFriends = function(friendsOrig){
  var string = friendsOrig[0]; 
  var splitArray = string.split(',');  
  this.friends = splitArray;
};

inviteSchema.methods.setType = function(typeOrig){
  var typeArray = type.split(',').map(function(item){
    return item.trim();
  })
  this.type = typeArray
}


mongoose.model('Invite', inviteSchema);