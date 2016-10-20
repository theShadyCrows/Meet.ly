angular.module('MeetlyApp.yourInvites', [])
.controller('yourInvites', function($scope, $location, Data, validateFormFactory, httpRequestsFactory, storeData){
  $scope.invite = {};  
  $scope.selectedCat = '-- Select Category --';   // DEFAULT CATEGORY

//****** CHANGE below to get invite data *******//
//probably very similar. difference is gonna be on 
//server side
 

  $scope.submitForm = function(formSubmissionObj) {
  	console.log('inside yourInvites')
    console.log('submitFrom data:')
    console.log(formSubmissionObj);

    httpRequestsFactory.postReqEvent(formSubmissionObj) //should validate this info first
  };



 

})
