var mongoose = require( 'mongoose' );
var _ = require('underscore');

var resultsSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'pending' //pending,complete
  },
  eventName: String,
  date: Date,
  time: String, //change type to Date? combine with date field?
  location: String,
  category: String,
  type: Array,  
  friends: Array, //this should be changed to emails
  user: String,
  eventID: String
});

// inviteSchema.methods.setFriends = function(friendsOrig){
//   var result = [];
//   _.each(friendsOrig[0], function(val,key){  
//     if(val) result.push(key);  
//     })
//   this.friends = result;  

//   }

resultsSchema.methods.setType = function(typeOrig){
  var result = [];
  _.each(typeOrig, function(val,key){    
    if(val) result.push(key);      
    })
  this.type = result;
}

resultsSchema.methods.setType2 = function(typeOrig){
  var typeArray = typeOrig.split(',').map(function(item){
    return item.trim();
  })
  this.type = typeArray.splice(0,1);
}

mongoose.model('Results', resultsSchema);

