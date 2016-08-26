// Set up app Factory Services
angular.module('MeetlyApp.services', [])
.factory('validateFormFactory', function() {
    // Form validation
    var toValidate = function(arg1, arg2) {
      return {'category': arg1, 'location': arg2};
    };
  
  return {
    toValidate: toValidate
  };
})

.factory('httpRequestsFactory', function($http) {
  // Handle GET and POST requests
  var postRequest = function(params) {
    console.log('====> ', params);
    return $http({
      method: 'POST',
      url: '/api/yelpAPI',
      data: params
    })
    .then(function (response) {
      return response.data;
    });
  };

  var googleMaps = function(userLoc, busLoc) {
    console.log('GOOGLE MAPS');
    // console.log('userLoc: ', userLoc);
    console.log('busLoc: ', busLoc);
  };

  return {
    postRequest: postRequest,
    googleMaps: googleMaps
  }
});

// params (in the URL) is for GET requests
// body (in the HTML) is for POST requests