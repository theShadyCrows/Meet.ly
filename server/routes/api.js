var router = require("express").Router();

//********** Yelp API **********//
//require yelp module
var request = require('request');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'ZZd9nkRObqyUruNcyW_U-Q',
  consumer_secret: 'yXYdTu1alsTgKyzCCntLqV83sZY',
  token: 'MxzzUU3nyH6whuUH_ugISQW69jjsubCP',
  token_secret: 'MiI3lxjFjLCIGnYWr9w0bS3dpP4',
});

router.post("/yelpAPI", function(req, res) {    
  yelp.search({ 
      category: req.body.place.f_category,
      term: req.body.place.f_type,
      location: req.body.place.f_location,
      limit: 5,
      sort: 2,
      radius_filter: 600
     })
  .then(function (data) {
    res.send(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});

//********** Authentication **********//
//require jwt for tokens
var jwt = require('express-jwt');
//require controllers
var ctrlSecured = require('../controllers/secured.js');
var ctrlAuth = require('../controllers/authentication');

var auth = jwt({
  secret: 'MeetlySecret',
  userProperty: 'payload'
});

// secured pages
router.get('/dashboard', auth, ctrlSecured.profileRead);
router.get('/friendsList', ctrlSecured.friendsList);

// signup and login
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//********** Data Retrieval **********//

module.exports = router;
