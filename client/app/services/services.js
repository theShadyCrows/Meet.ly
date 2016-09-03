// APPLICATION FACTORY SERVICES
angular.module('MeetlyApp.services', [])

// FORM DATA VALIDATION ===========================================================================
.factory('validateFormFactory', function() {
    var toValidate = function(obj) {
      if (obj.place.f_category !== '-- Select Category --' || obj.place.f_category !== null || obj.place.f_category !== undefined) {
        // HANDLE OK
      }

      if (obj.place.f_type !== '' || obj.place.f_type !== null || obj.place.f_type !== undefined) {
        // HANDLE OK
      }

      if (obj.place.f_location !== '' || obj.place.f_location !== null || obj.place.f_location !== undefined) {
        // HANDLE OK
      }

      if (obj.dateTime.f_date !== '' || obj.dateTime.f_date !== null || obj.dateTime.f_date !== date) {
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

// HANDLE ALL HTTP REQUESTS =======================================================================
.factory('httpRequestsFactory', function($location, $http, Auth) {

  var postRequest = function(params) {
    console.log('params ====> ', params)
    return $http({
      method: 'POST',
      url: '/api/yelpAPI',
      data: params
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log('WE HAVE AN ERROR')
      console.error(error);
    });
  };

  // ======================================================
  // TO DO: GET AND POST REQUEST FOR FRIENDS LIST
  // ======================================================
  var friendsList = function(friendsListObj) {
    return $http({
      method: 'GET',
      url: '/api/friendsList',
      headers: {
          Authorization: 'Bearer '+ Auth.getToken()
        }
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
    
  };

  return {
    postRequest: postRequest,
    friendsList: friendsList
  }
})

// SET AND GET DATA ===============================================================================
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
})

// CITIBIKE API ===================================================================================
.factory('citibikeFactory', function ($http) {
  var getCitiBikeLocations = function () {
    return $http({
      method: 'GET',
      url: 'http://api.citybik.es/citi-bike-nyc.json'
    });
  };

  return {
    getCitiBikeLocations: getCitiBikeLocations
  };
});

// params (in the URL) is for GET requests
// body (in the HTML) is for POST requests

