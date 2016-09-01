// CONTROLLER USED TO HANDLE MEET INVITE FORM DATA
angular.module('MeetlyApp.form', [])

.controller('formController', function($scope, $location, validateFormFactory, httpRequestsFactory, storeData) {

  // SET VARIABLES
  $scope.selectedCat = '-- Select Category --';   // DEFAULT CATEGORY

  // CREATE CUSTOM DROP DOWN CONTAINER
  dropDown($scope);

  // HANDLE FORM SUBMISSION AND VALIDATE DATA
  $scope.submitForm = function(formSubmissionObj) {
    $scope.postRequest = validateFormFactory.toValidate(formSubmissionObj);
    
    if ($scope.postRequest) {
      // DATA IS VALID AND CAN CALL YELP API POST REQUEST
      initMeetSearch();
    } else {
      // HANDLE VALIDATION ERROR
    };
  };

  // Send form data to server API router
  $scope.data = {};
  var initMeetSearch = function () {

    // PARSING OBJECT DATA TO PASS 'CATEGORY' AND 'LOCATION'
    // FOR YELP'S API SAERCH
    var sendReq = {
      category: $scope.postRequest.obj.place.f_category,
      // type: $scope.postRequest.obj.place.f_type,
      location: $scope.postRequest.obj.place.f_location
    }

    httpRequestsFactory.postRequest(sendReq)
      .then(function (searchResults) {
        $scope.data.results = searchResults;

        // STORE DATA
        storeData.set('apiResults', $scope.data.results);

        // REDIRECT TO RESULTS PAGE
        $location.path('/map-view');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // // Google API
  // var initGoogleMaps = function() {
  //   // httpRequestsFactory.googleMaps($scope.data.results.businesses[0].location.coordinate, 'userLoc');
  //   httpRequestsFactory.googleMaps($scope)
  //     // .then(function(data) {
  //     //   console.log('data: ', data);
  //     // })
  //     // .catch(function(error) {
  //     //   console.error(error);
  //     // })
  // };

  // SET GEO-LOCATION
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  var geoLoc = {};

  function success(pos) {
    var crd = pos.coords;
    geoLoc.lat = parseFloat(crd.latitude);
    geoLoc.lng = parseFloat(crd.longitude);
    storeData.set('geoLocation', geoLoc);
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

});
