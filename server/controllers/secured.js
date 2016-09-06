var mongoose = require('mongoose');
var User = mongoose.model('User');
var Invite = mongoose.model('Invite');
var Results = mongoose.model('Results');
var ResultsCtrl = require('./results.js');
// var findName = function(payloadID){
//     User
//     .findById(payloadID)
//     .exec(function(err, user) {
//       res.status(200).json(user);
//     });

// }


module.exports.profileRead = function(req, res) {

//********* Every secured page will have to go through this check **********//

//**** need to add some error handling for if payloadId provided but not found
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};

module.exports.friendsList = function(req, res) {

//Need to send back array without hashes 
    User
      .find({})    
      .where('_id').ne(req.payload._id)      
      .exec(function(err, user) {
        res.status(200).json(user);
      });

};



//****** add Invite method *******//
//similar to profileRead
//need to use payload._id to find email, then
//use email to find which invites to send back

module.exports.invites = function(req, res) {
    User
      .find({})
      .where('_id').equals(req.payload._id)
      .exec(function(err, user) {      
        Invite
        .find({friends:user[0].name})//change to email      
        .exec(function(err2,user2){
          res.status(200).json(user2);
        })
        
      });
};

module.exports.insertResult = function(req, res) {

//update invite to take user off friends list
    // User
    //   .find({})
    //   .where('_id').equals(req.payload._id)
    //   .exec(function(err, user) {      
    //     Invite
    //     .find({friends:user[0].name})//change to email      
    //     .exec(function(err2,user2){
    //       console.log(user2)
    //       res.status(200).json(user2);
    //     })
        
    //   });

    User
      .find({})
      .where('_id').equals(req.payload._id)
      .exec(function(err, user) {       
        var results = new Results();

        results.eventName = req.body.f_name;
        results.date = req.body.place.dateTime;        
        
        results.location = req.body.place.f_location;
        results.category = req.body.place.f_category;        
        results.user = user[0].name;
        results.eventID = req.body.f_eventID;
        results.friends = req.body.f_friends;
        
        results.setType(req.body.place.f_type);

        results.save(function(err) {
          var token;    
          res.status(200);
        });  
        ResultsCtrl.checkResults();
      }) 

      
  
//******** check if any invites finished
//if so, find averages, send YELP, and populate
// Events page :) 



};


