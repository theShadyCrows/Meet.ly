var router = require("express").Router();

//********** Yelp API **********//
//require yelp module
// var request = require('request');
// var Yelp = require('yelp');
var ctrlInv = require('../controllers/invites');

// var yelp = new Yelp({
//   consumer_key: 'ZZd9nkRObqyUruNcyW_U-Q',
//   consumer_secret: 'yXYdTu1alsTgKyzCCntLqV83sZY',
//   token: 'MxzzUU3nyH6whuUH_ugISQW69jjsubCP',
//   token_secret: 'MiI3lxjFjLCIGnYWr9w0bS3dpP4',
// });

// router.post("/yelpAPI", ctrlInv.register)

// router.post("/yelpAPI", function(req, res) {    
//   console.log('yelpAPI request handler')
//   console.log(req.body)
//   console.log(req.body.place.f_friends)

//   //eventually move yelp.search into controller
//   yelp.search({     
//       term: req.body.place.f_type, // this will eventually be subcategories (e.g. Thai, Greek)
//       category_filter: req.body.place.f_category, //this will correspond to cateogry (e.g. Restaurant)
//       location: req.body.place.f_location,
//       limit: 5,
//       sort: 2,
//       radius_filter: 600
//      })
//   .then(function (data) {
//     res.send(data);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });
// });

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
router.post("/yelpAPI", auth, ctrlInv.register)
router.post("/results", auth, ctrlSecured.insertResult)
router.get('/dashboard', auth, ctrlSecured.profileRead);
router.get('/friendsList', auth, ctrlSecured.friendsList);
router.get('/invites', auth, ctrlSecured.invites);
router.get('/mapView', auth, ctrlSecured.mapView);

// signup and login
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//********** Data Retrieval **********//

module.exports = router;
