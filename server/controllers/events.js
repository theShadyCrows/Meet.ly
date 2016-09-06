var mongoose = require( 'mongoose' );
var Results = mongoose.model('Results');
var Event = mongoose.model('Event');
var _ = require('underscore');
var request = require('request');
var Yelp = require('yelp');
var yelp = new Yelp({
    consumer_key: 'ZZd9nkRObqyUruNcyW_U-Q',
    consumer_secret: 'yXYdTu1alsTgKyzCCntLqV83sZY',
    token: 'MxzzUU3nyH6whuUH_ugISQW69jjsubCP',
    token_secret: 'MiI3lxjFjLCIGnYWr9w0bS3dpP4',
});


//find all results marked 'complete'
module.exports.findComplete = function(req, res) {
    console.log('FIND COMPLETE RUNNING')
  Results
    .find({status:'complete'})     
    .exec(function(err, result) { 
        console.log('events results!')
        console.log(result)        
        //****assuming all completed results are for same event
        //****this obviously needs to change!
        
        //average all results for each unique eventID
        //need:
            //category
            //term
            //location        
        var category = result[0].category.toLowerCase();         
        var terms = [];
        _.each(result,function(res){
            terms.push(res.type[0])
        })
       
        //find most common term
        var memo = {};
        var termCommon = '';
        var termCommonVal = 0;
        _.each(terms, function(term){
            memo[term] = memo[term] +1 || 1;
        })
        
        _.each(memo, function(val,key){

            if(val > termCommonVal){                
                termCommon = key;                
                termCommonVal = val;                
            }            
        })        
        
            
        var location = '1216 Broadway, NYC';
        //ToDo: need to find midpoint location.   
        var locationMid; 
        //ToDo: need to find midpoint time.
        var timeMid;

        console.log('termCommonVal', termCommonVal);
        console.log('location', location);
        console.log('category', category);

        var event = new Event();

        event.eventName = result[0].eventName;
        event.date = result[0].date; //todo:change to midpoint
        event.time = result.time; //todo:chnage to mid
        event.location = location;//todo: change to mid
        event.category = category;
        event.type = termCommonVal;
        event.friends = result[0].friends;

        event.save(function(err) {
            var token;    
            if(err) {
                console.log('error saving: ', err)
            }
        });
        
        
        // yelp.search({     
        //   category_filter: category, //this will correspond to cateogry (e.g. Restaurant)          
        //   term: termCommonVal, // this will eventually be subcategories (e.g. Thai, Greek)        
        //   location: location,
        //   limit: 1,
        //   sort: 2,
        //   radius_filter: 600
        //  })
        // .then(function (data) {
        //     console.log('YELP response')
        //     console.log(data)            
            
            


        // })
        // .catch(function (err) {
        //     console.log('YELP error')
        //     console.error(err);
        // });

    })
}




//send YELP request

//populate Events collection with results
    //this is what the map-view will pull from