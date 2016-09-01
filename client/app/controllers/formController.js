// CONTROLLER USED TO HANDLE MEET INVITE FORM DATA
angular.module('MeetlyApp.form', [])
.controller('formController', function($scope, validateFormFactory, httpRequestsFactory, storeData) {

  // SET VARIABLES
  $scope.selectedCat = '-- Select Category --';   // DEFAULT CATEGORY

  // CREATE CUSTOM DROP DOWN CONTAINER
  dropDown($scope);

  // Caputure form data and validate before sending request
  // HANDLE FORM SUBMISSION AND VALIDATE DATA
  $scope.submitForm = function(selectedCat, inputType, inputLocation, selectDate) {
    $scope.postRequest = validateFormFactory.toValidate($scope.selectedCat, $scope.inputType, $scope.inputLocation, $scope.selectDate);
    // console.log('SUBMISSION DATA: ', $scope.postRequest);
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
    httpRequestsFactory.postRequest($scope.postRequest)
      .then(function (searchResults) {
        $scope.data.results = searchResults;
        console.log('$scope.data.results ===> ', $scope.data.results);

        // STORE DATA
        storeData.set('apiResults', $scope.data.results);

        initGoogleMaps();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Google API
  var initGoogleMaps = function() {
    // httpRequestsFactory.googleMaps($scope.data.results.businesses[0].location.coordinate, 'userLoc');
    httpRequestsFactory.googleMaps($scope)
      // .then(function(data) {
      //   console.log('data: ', data);
      // })
      // .catch(function(error) {
      //   console.error(error);
      // })
  };

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
    storeData.set($scope.data.results);
    console.log('geoLoc: ', geoLoc);
    // console.log('Your current position is:');
    // console.log('Latitude : ' + crd.latitude);
    // console.log('Longitude: ' + crd.longitude);
    // console.log('More or less ' + crd.accuracy + ' meters.');
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

});
