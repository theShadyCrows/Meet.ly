angular.module('MeetlyApp.invites', [])
.controller('Invites', function($scope, $location, Data, validateFormFactory, httpRequestsFactory, storeData){
  $scope.invite = {};  
  $scope.selectedCat = '-- Select Category --';   // DEFAULT CATEGORY

//****** CHANGE below to get invite data *******//
//probably very similar. difference is gonna be on 
//server side
  Data.getInvites()
    .success(function(data){     
      $scope.invite = data[0]; //just use first invite for now
    })
    .error(function(error){
      console.log(error);
    });

  $scope.submitForm = function(formSubmissionObj) {
    console.log('submitFrom data:')
    console.log(formSubmissionObj);

    httpRequestsFactory.postReqEvent(formSubmissionObj) //should validate this info first
  };

  $scope.selectedTypes = {
      selected:{}
  };

   $scope.toggleCheckbox = function(friend) {
    console.log('selected: ', $scope.selectedTypes)
  }

})

 // // HANDLE FORM SUBMISSION AND VALIDATE DATA =====================================================
 //  $scope.submitForm = function(formSubmissionObj) {
 //    $scope.postRequest = validateFormFactory.toValidate(formSubmissionObj);
    
 //    if ($scope.postRequest) {
 //      // DATA IS VALID AND CAN CALL YELP API POST REQUEST
 //      initMeetSearch();
 //    } else {
 //      // HANDLE VALIDATION ERROR
 //    };
 //  };

 //  // SEND FORM DATA TO SERVER API ROUTER ==========================================================
 //  $scope.data = {};
 //  var initMeetSearch = function () {
 //    httpRequestsFactory.postRequest($scope.postRequest.obj)
 //      .then(function (searchResults) {
 //        $scope.data.results = searchResults;

 //        // STORE DATA
 //        storeData.set('apiResults', $scope.data.results);

 //        // REDIRECT TO RESULTS PAGE
 //        $location.path('/map-view');
 //      })
 //      .catch(function (error) {
 //        console.error(error);
 //      });
 //  };

 //  // SET AND STORE GEO LOCATION ===================================================================
 //  var geoLocator = function() {
 //    var options = {
 //      enableHighAccuracy: true,
 //      timeout: 5000,
 //      maximumAge: 0
 //    };

 //    var geoLoc = {};

 //    function success(pos) {
 //      var crd = pos.coords;
 //      geoLoc.lat = parseFloat(crd.latitude);
 //      geoLoc.lng = parseFloat(crd.longitude);
 //      storeData.set('geoLocation', geoLoc);
 //    };

 //    function error(err) {
 //      console.warn('ERROR(' + err.code + '): ' + err.message);
 //    };

 //    navigator.geolocation.getCurrentPosition(success, error, options);
 //  };

