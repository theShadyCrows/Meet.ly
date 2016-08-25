// This AngularJS controller is used for form submission
angular.module('MeetlyApp.form', [])
.controller('formController', function($scope, validateFormFactory, httpRequestsFactory) {
  
  // Validate form before sending GET request
  $scope.submitForm = function(selected, location) {
    $scope.postRequest = validateFormFactory.toValidate($scope.selected, $scope.location);
    // console.log($scope.postRequest);
    initMeetSearch();
  }

  // Send form data to server API router
  var initMeetSearch = function () {
    httpRequestsFactory.postRequest($scope.postRequest)
      .then(function (searchResults) {
        $scope.data.postRequest = postRequest;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

});