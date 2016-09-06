var mongoose = require('mongoose');
var User = mongoose.model('User');
var Invite = mongoose.model('Invite');
var Results = mongoose.model('Results');
var Events = require('./events.js');
var _ = require('underscore');


module.exports.checkResults = function(req, res) {

  console.log('checkResults running');

      Results
        .find({status:'pending'})        
        .exec(function(err, result) {                 
          // console.log('results!')
          // console.log(result)
          var checked = [];
          _.each(result,function(res){
            if(checked.indexOf(res.eventID) < 0){
              // console.log('test passed');
              var numberInvited = 0;
              var numberOfInvites = 0;
              Results
                .find({eventID:res.eventID})
                .exec(function(err2,result2){
                  // console.log('reached result2')                  
                  numberInvited = result2[0].friends.length;
                  numberOfInvites = result2.length;
                  // console.log('numberInvited', numberInvited)
                  // console.log('numberOfInvites', numberOfInvites)
                  if(numberInvited <= numberOfInvites){
                    // console.log('updating', res.eventID)
                    
                    Results.update({eventID:res.eventID}, {status:'complete'},{multi: true}, function(err,affected){
                      console.log('affected rows', affected);
                      Events.findComplete();
                    })                 
                  } else Events.findComplete();
                  

                })
              checked.push(res._id)
            }
          })
        })
}
