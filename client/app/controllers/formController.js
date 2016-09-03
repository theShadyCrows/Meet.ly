// CONTROLLER USED TO HANDLE MEET INVITE FORM DATA
angular.module('MeetlyApp.form', [])

.controller('formController', function($scope, $location, validateFormFactory, httpRequestsFactory, storeData) {

  // SET VARIABLES
  $scope.formData = {};
  $scope.categoryData = [
    { name: 'Select Category' },
    { name: 'Active Life' },
    { name: 'Arts & Entertainment' },
    { name: 'Automotive' },
    { name: 'Beauty & Spas' },
    { name: 'Education' },
    { name: 'Event Planning & Services' },
    { name: 'Financial Services' },
    { name: 'Food' },
    { name: 'Health & Medical' },
    { name: 'Home Services' },
    { name: 'Hotels & Travel' },
    { name: 'Local Flavor' },
    { name: 'Local Services' },
    { name: 'Mass Media' },
    { name: 'Nightlife' },
    { name: 'Pets' },
    { name: 'Professional Services' },
    { name: 'Public Services & Government' },
    { name: 'Real Estate' },
    { name: 'Religious Organizations' },
    { name: 'Restaurants' },
    { name: 'Shopping' }
  ];

  $scope.disableName = 'Select Category'

  $scope.selectedCategory = $scope.categoryData[0];

  // PULL FRIENDS LIST AND APPEND TO PAGE ===============================================
  httpRequestsFactory.friendsList()
  .then(function (friends) {
    $scope.friendsList = friends;
    console.log('friends: ', $scope.friendsList)
  })
  .catch(function (error) {
    console.error(error);
  });

  // CREATE CHECKBOX FOR FRIENDS LIST ====================================================
  $scope.selectedFriends = {
      selected:{}
  };

  $scope.toggleCheckbox = function(friend) {
    console.log('selected: ', $scope.selectedFriends)
  }

  // $scope.selectedCat = '-- Select Category --';   // DEFAULT CATEGORY

  // HANDLE FORM SUBMISSION AND VALIDATE DATA =====================================================
  $scope.submitForm = function(formSubmissionObj) {
    $scope.postRequest = validateFormFactory.toValidate(formSubmissionObj);
    console.log('submitted form data: ', $scope.postRequest);
    
    if ($scope.postRequest) {
      // DATA IS VALID AND CAN CALL YELP API POST REQUEST
      initMeetSearch();
    } else {
      // HANDLE VALIDATION ERROR
    };
  };

  // SEND FORM DATA TO SERVER API ROUTER ==========================================================
  $scope.data = {};
  var initMeetSearch = function () {
    httpRequestsFactory.postRequest($scope.postRequest.obj)
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

  // SET AND STORE GEO LOCATION ===================================================================
  var geoLocator = function() {
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
  };

  // INVOKE FUNCTIONS
  geoLocator();       // GET GEO LOCATION

});
