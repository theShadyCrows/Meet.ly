var mongoose = require('mongoose');
var User = mongoose.model('User');

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

//Need to add conditional for not sending back own username
//Need to send back array without hashes
 
    User
      .find({})
      // .where('email').ne(req.body.user)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  // }

};


//****** add Invite method *******//
//similar to profileRead
//need to use payload._id to find email, then
//use email to find which invites to send back




