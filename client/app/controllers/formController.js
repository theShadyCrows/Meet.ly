// This AngularJS controller is used for form submission
angular.module('MeetlyApp.form', [])
.controller('formController', function($scope, validateFormFactory, httpRequestsFactory) {

  $scope.selectedCat = '-- Select Category --';
  $scope.postRequest;
  dropDown($scope);

  // Caputure form data and validate before sending request
  $scope.submitForm = function(selectedCat, inputType, inputLocation) {
    $scope.postRequest = validateFormFactory.toValidate($scope.selectedCat, $scope.inputType, $scope.inputLocation);
    if ($scope.postRequest) {
      initMeetSearch();
    } else {
      // HANDLE VALIDATION ERROR
    }
    
  }

  // Send form data to server API router
  $scope.data = {}; 
  var initMeetSearch = function () {
    httpRequestsFactory.postRequest($scope.postRequest)
      .then(function (searchResults) {
        $scope.data.results = searchResults;
        console.log('$scope.data.results ===> ', $scope.data.results)
        // console.log('loc: ', $scope.data.results.businesses[0].location.coordinate);

        // PARSE OBJECT DATA
        

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



