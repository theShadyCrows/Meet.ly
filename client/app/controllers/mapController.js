// CONTROLLER USED TO HANDLE INVITE RESULTS PAGE
angular.module('MeetlyApp.map', [])
.controller('mapController', function($scope, httpRequestsFactory, storeData) {
  // SET VARIABLES
  
  // GET DATA
  var preParseData = storeData.get('apiResults');
  var originLocation = storeData.get('geoLocation');
  console.log(originLocation);

  // PARSE OBJECT DATA FOR LOCATION DETAILS AREA
  $scope.locationDetails = preParseData.businesses[0];
  console.log('$scope.locationDetails ==>', $scope.locationDetails);

  // GOOGLE MAPS API  ============================================================

  // GOOGLE MAPS API: AIzaSyDNIFVWOXNcqHxl_2bI8WHa9BbYReKdpCo

  function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 40.7465051, lng: -73.9904466 }//{lat: 37.77, lng: -122.447}
    });
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay);
    // document.getElementById('mode').addEventListener('change', function() {
    //   calculateAndDisplayRoute(directionsService, directionsDisplay);
    // });
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // var selectedMode = document.getElementById('mode').value;
    var latlng = new google.maps.LatLng($scope.locationDetails.location.coordinate.latitude, $scope.locationDetails.location.coordinate.longitude);
    console.log('latlng: ', latlng)
    directionsService.route({
      // origin: {lat: 37.77, lng: -122.447},  // Haight.
      // destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
      origin: originLocation,
      destination: latlng,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: 'WALKING'//google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  initMap();


});