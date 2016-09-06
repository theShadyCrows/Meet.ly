var mongoose = require('mongoose');
var User = mongoose.model('User');
var Invite = mongoose.model('Invite');
var Results = mongoose.model('Results');
var ResultsCtrl = require('./results.js');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  console.log('INVITE CONTROL RUNNING')
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

  /////*** also need to add it to Results collection
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
    
    results.setType2(req.body.place.f_type);

    results.save(function(err) {
      var token;    
      res.status(200);
    });  
    ResultsCtrl.checkResults();
  }) 
};

