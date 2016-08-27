// This AngularJS controller is used for form submission
angular.module('MeetlyApp.form', [])
.controller('formController', function($scope, validateFormFactory, httpRequestsFactory) {
  
  // Validate form before sending GET request
  $scope.submitForm = function(selectedCat, selectedType, location) {
    $scope.postRequest = validateFormFactory.toValidate(selectedCat, selectedType, location);
    // console.log($scope.postRequest);
    initMeetSearch();
  }

  // Send form data to server API router
  $scope.data = {}; 
  var initMeetSearch = function () {
    httpRequestsFactory.postRequest($scope.postRequest)
      .then(function (searchResults) {
        // console.log('========>', searchResults);
        $scope.data.results = searchResults;
        console.log('loc: ', $scope.data.results.businesses[0].location.coordinate);
        initGoogleMaps();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Google API
  var initGoogleMaps = function() {
    httpRequestsFactory.googleMaps($scope.data.results.businesses[0].location.coordinate, 'userLoc');
      // .then(function(data) {
      //   console.log('data: ', data);
      // })
      // .catch(function(error) {
      //   console.error(error);
      // })
  };

});