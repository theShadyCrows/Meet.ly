// Set up app Factory Services
angular.module('MeetlyApp.services', [])
.factory('validateFormFactory', function() {
    // Form validation
    var toValidate = function(arg1, arg2, arg3) {
      return {'category': arg1, 'type': arg2, 'location': arg3};
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

  var googleMaps = function(busLoc, userLoc) {

    /*
     * GOOGLE MAPS API: AIzaSyDNIFVWOXNcqHxl_2bI8WHa9BbYReKdpCo
     */

    console.log('GOOGLE MAPS');
    // console.log('busLoc: ', busLoc);

    var busLocObj = {};
    busLocObj.lat = busLoc.latitude;
    busLocObj.lng = busLoc.longitude;


    initMap(busLocObj);



    // return $http({
    //   method: 'POST',
    //   url: '/api/GoogleMapsAPI',
    //   data: params
    // })
    // .then(function (response) {
    //   return response.data;
    // });
  };

  return {
    postRequest: postRequest,
    googleMaps: googleMaps
  }
});

// params (in the URL) is for GET requests
// body (in the HTML) is for POST requests

// .factory('Auth', function ($http, $location, $window) {

//   // Private variable that keeps track of the current user status (logged in or out)
//   var isLoggedIn = false;

//   // login the user, check the status by then-ing and catching,
//   // route accordingly
//   var login = function (user) {
//     return $http({
//       method: 'POST',
//       url: '/login',
//       data: user
//     })
//     .then(function (resp) {
//       isLoggedIn =  true;
//       $location.path('/tasks')
//     })
//     .catch(function (err){
//       isLoggedIn = false;
//       $location.path('/login')
//     });
//   };

//   // NOTE: This is not an ideal scenario,
//   // However, the server doesn't autmatically log new users in.
//   // Therefore, the user must signup and then login.
//   var signup = function (user) {
//     return $http({
//       method: 'POST',
//       url: '/signup',
//       data: user
//     })
//     .then(function (resp) {
//       $location.path('/login')
//     });
//   };

//   // Helper function to read the private variable above.
//   var isAuth = function () {
//     return isLoggedIn;
//   };

//   // Server detroy's the session and refreshes the page anyway.
//   var signout = function () {
//     return $http({
//       method: 'POST',
//       url: '/logout'
//     })
//     .then(function(){
//       isLoggedIn = false;
//       $location.path('/login');
//     })
//   };

//   // Return Factory API
//   return {
//     login: login,
//     signup: signup,
//     isAuth: isAuth,
//     signout: signout
//   };
// });
