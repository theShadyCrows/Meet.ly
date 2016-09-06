var mongoose = require('mongoose');
var User = mongoose.model('User');
var Invite = mongoose.model('Invite');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  //Note: not receiving email for users. we need 
  //to eventually use email instead of name because names
  //are not unique

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

////////*** Need to add validation of form data

  console.log('req')
  console.log(req.body)
  var invite = new Invite();

  invite.eventName = req.body.f_name;
  invite.date = req.body.place.dateTime,
  // invite.time = 
  invite.location = req.body.place.f_location;
  invite.category = req.body.place.f_category;

  invite.setFriends(req.body.f_friends);
  invite.setType(req.body.place.f_type);

////////*** Need to add error handling for save method below

  invite.save(function(err) {
    var token;    
    res.status(200);
  });

};

