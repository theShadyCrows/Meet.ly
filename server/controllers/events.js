var mongoose = require( 'mongoose' );
var Results = mongoose.model('Results');
var Event = mongoose.model('Event');
var _ = require('underscore');
//find all results marked 'complete'
  Results
    .find({status:'complete'})     
    .exec(function(err, result) { 
        console.log('events results!')        
        //****assuming all completed results are for same event
        //****this obviously needs to change!
        
        //average all results for each unique eventID
        //need:
            //category
            //term
            //location        
        var category = result[0].category;        
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
        console.log(memo)
        _.each(memo, function(val,key){
        console.log('val', val)            
        console.log('key', key)
            if(val > termCommonVal){                
                termCommon = key;                
                termCommonVal = val;                
            }            
        })        
        
        //find mi
        var location = '';    

    })




//send YELP request

//populate Events collection with results
    //this is what the map-view will pull from