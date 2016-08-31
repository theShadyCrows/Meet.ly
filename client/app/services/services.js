// APPLICATION FACTORY SERVICES
angular.module('MeetlyApp.services', [])

// FORM DATA VALIDATION
.factory('validateFormFactory', function() {
    var toValidate = function(category, type, location, date) {

      if (category !== '-- Select Category --' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (type !== '' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (location !== '' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (date !== '' || date !== null || category !== date) {
        // HANDLE OK
      }

      // RETURN VALID OBJECT
      return {category: category, type: type, location: location, date: date}
    };
  
  return {
    toValidate: toValidate
  };
})

// HANDLE ALL HTTP REQUESTS
.factory('httpRequestsFactory', function($location, $http) {
  var postRequest = function(params) {
    // console.log('====> ', params);
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

  var googleMaps = function() {

    alert('START GOOGLE MAPS');

    $location.path('/map-view');


    // $http({
    //   method: 'POST',
    //   url: '/api/GoogleMapsAPI',
    //   data: locations
    // }).success(function(data) {
    //   $location.path('/map-view');
    // })
    // .catch(function(error) {
    //   console.error(error);
    // });

    // return $http({
    //   method: 'POST',
    //   url: '/api/GoogleMapsAPI',
    //   data: params
    // })
    // .then(function (response) {
    //   return response.data;
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });
  };

  return {
    postRequest: postRequest,
    googleMaps: googleMaps
  }
})

// SET AND GET DATA
.factory('storeData', function() {
  var storedData = {};

  function set(objName, data) {
    // storedData[objName] = data
    // console.log('storedData: ', storedData);

    storedData = data;
  };

  function get(objName) {
    // return storedData[objName];
    return storedData
  }

  return {
    set: set,
    get: get
  }
});
