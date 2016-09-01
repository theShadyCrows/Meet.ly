// AngularJS controller for yelp views

angular.module('MeetlyApp.yelp', [])


.controller('yelpController', function($scope, httpRequestsFactory){
  $scope.data = {};
  var getImages = function () {
    httpRequestsFactory.postRequest($scope.postRequest)
      .then(function (searchResults) {
        $scope.data.results = searchResults;
        console.log('$scope.data.results ===> ', $scope.data.results);

        // STORE DATA
        // storeData.set('apiResults', $scope.data.results);

      })
      .catch(function (error) {
        console.error(error);
      });
  };

})
