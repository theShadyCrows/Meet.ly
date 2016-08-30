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
        storeData.set($scope.data.results);
        
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


});



