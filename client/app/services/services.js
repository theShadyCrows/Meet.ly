// APPLICATION FACTORY SERVICES
angular.module('MeetlyApp.services', [])

// FORM DATA VALIDATION
.factory('validateFormFactory', function() {
    var toValidate = function(obj) {
      if (obj.place.f_category !== '-- Select Category --' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (obj.place.f_type !== '' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (obj.place.f_location !== '' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (obj.dateTime.f_date !== '' || date !== null || category !== date) {
        // HANDLE OK
      }

      if (obj.dateTime.f_date !== '' || date !== null || category !== date) {
        // HANDLE OK
      }

      if (obj.dateTime.f_time !== '' || date !== null || category !== date) {
        // HANDLE OK
      }

      // RETURN VALID OBJECT
      return {obj}
    };
  
  return {
    toValidate: toValidate
  };
})

// HANDLE ALL HTTP REQUESTS
.factory('httpRequestsFactory', function($location, $http) {
  var postRequest = function(params) {
    return $http({
      method: 'POST',
      url: '/api/yelpAPI',
      data: params
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  var friendsList = function() {

    // TO ADD: GET AND POST REQUEST FOR FRIENDS LIST
    
  };

  return {
    postRequest: postRequest,
    friendsList: friendsList
  }
})

// SET AND GET DATA
.factory('storeData', function() {
  var storedData = {};

  function set(objName, data) {
    storedData[objName] = data
  };

  function get(objName) {
    return storedData[objName];
  }

  return {
    set: set,
    get: get
  }
});


//citiBike factory

.factory ('citibikeFactory', function ($http) {

  var getData = function () {

    return $http({
      method: 'GET',
      url: 'http://api.citybik.es/citi-bike-nyc.json'
    })    
  };

  return {
    getData: getData
  };
  console.log('%%%',getData);

});




// params (in the URL) is for GET requests
// body (in the HTML) is for POST requests
