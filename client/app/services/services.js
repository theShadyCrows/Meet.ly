// Set up app Factory Services
angular.module('MeetlyApp.services', [])
.factory('validateFormFactory', function() {
    // Form validation
    var toValidate = function(category, type, location) {

      if (category !== '-- Select Category --' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (type !== '' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      if (location !== '' || category !== null || category !== undefined) {
        // HANDLE OK
      }

      // RETURN VALID OBJECT
      return {category: category, type: type, location: location}
    };
  
  return {
    toValidate: toValidate
  };
})

.factory('httpRequestsFactory', function($location, $http) {
  // Handle GET and POST requests
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

  var googleMaps = function(locations) {

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



    // console.log('GOOGLE MAPS');
    // console.log('busLoc: ', busLoc);

    // var busLocObj = {};
    // busLocObj.lat = busLoc.latitude;
    // busLocObj.lng = busLoc.longitude;

    // initMap(busLocObj);

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
});

// params (in the URL) is for GET requests
// body (in the HTML) is for POST requests