var router = require("express").Router();
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
      term: req.body.category, // this will eventually be subcategories (e.g. Thai, Greek)
      // category_filter: req.body.category, //this will correspond to cateogry (e.g. Restaurant)
      location: req.body.location,
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

module.exports = router;
