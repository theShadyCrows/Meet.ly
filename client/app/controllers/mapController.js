// CONTROLLER USED TO HANDLE INVITE RESULTS PAGE
angular.module('MeetlyApp.map', [])

.controller('mapController', function($scope, httpRequestsFactory, storeData, citibikeFactory) {
  // GET DATA & SET VARIABLES
  var preParseData = storeData.get('apiResults');
  var geoLocation = storeData.get('geoLocation');

  // PARSE OBJECT DATA FOR LOCATION DETAILS AREA
  $scope.locationDetails = preParseData.businesses[0];

  // GOOGLE MAPS API  =============================================================================
  // SET VARIABLES
  $scope.map = {};
  $scope.map.marker;
  $scope.map.markersArray = [];
  $scope.map.destinationLatLng;
  $scope.map.markerImg = 'https://s3.amazonaws.com/fullstackacademy/img/marker_100.png';
  $scope.map.toggleMarkers = true;

  // START: INIT MAP
  var initMap = function() {
    // GOOGLE MAPS API: AIzaSyDNIFVWOXNcqHxl_2bI8WHa9BbYReKdpCo
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: geoLocation
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    $scope.addMarkers = function() {
    // GET CITIBANK LOCATIONS
    citibikeFactory.getCitiBikeLocations()
    .then(function(bikeRacks) {
      bikeRacks.data.forEach(function(rack) {
        var rackLoc = new google.maps.LatLng(rack.lat/1000000, rack.lng/1000000);
        // var locM = new google.maps.LatLng(40.7465051, -73.9904466);
        var geoLoc = new google.maps.LatLng(geoLocation.lat, geoLocation.lng);
        distance = google.maps.geometry.spherical.computeDistanceBetween( geoLoc, rackLoc );

        if (distance < 500) {
          marker = new google.maps.Marker({
            position: rackLoc,
            map: map,
            icon: $scope.map.markerImg
          });
        }
      });

    })
    .catch(function (error) {
      console.error(error);
    });
  }
  };
  // END: INIT MAP

  // START: CALCULATE AND DISPLAY ROUTE
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    $scope.map.destinationLatLng = new google.maps.LatLng($scope.locationDetails.location.coordinate.latitude, $scope.locationDetails.location.coordinate.longitude);
    
    directionsService.route({
      origin: geoLocation,
      destination: $scope.map.destinationLatLng,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: 'WALKING'//google.maps.TravelMode[selectedMode]
      },
      function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  };
  // END: CALCULATE AND DISPLAY ROUTE

  


  // START: TOGGLE CITIBIKE MARKERS
  $scope.toggleCitiBikeMarkers = function() {
    if (!$scope.toggleMarkers) {
      alert('ADD MARKERS');
      $scope.addMarkers();
    } else {
      alert('REMOVE MARKERS');
    }
  };
  // END: TOGGLE CITIBIKE MARKERS












  // // GOOGLE MAPS API  =============================================================================
  // var initMap = function() {
  //   // GOOGLE MAPS API: AIzaSyDNIFVWOXNcqHxl_2bI8WHa9BbYReKdpCo
  //   var directionsDisplay = new google.maps.DirectionsRenderer;
  //   var directionsService = new google.maps.DirectionsService;

  //   // MARKER ARRAY
  //   var markers = [];

  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 15,
  //     center: originLocation  //{ lat: 40.7465051, lng: -73.9904466 }
  //   });
  //   directionsDisplay.setMap(map);

  //   calculateAndDisplayRoute(directionsService, directionsDisplay);

  //   // ADD CITIBIKE MARKERS
  //   $scope.addMarkers = function() {
  //   // GET CITIBANK LOCATIONS
  //   citibikeFactory.getCitiBikeLocations()
  //     .then(function(bikeRacks) {
  //       var marker;
  //       var markerImg = 'https://s3.amazonaws.com/fullstackacademy/img/marker_100.png';
  //       var distance = 0;
  //       $scope.toggleMarkers = true;

  //       bikeRacks.data.forEach(function(rack) {
  //         var rackLoc = new google.maps.LatLng(rack.lat/1000000, rack.lng/1000000);
  //         var locM = new google.maps.LatLng(40.7465051, -73.9904466);
  //         distance = google.maps.geometry.spherical.computeDistanceBetween( $scope.destinationLatLng, rackLoc );

  //         if (distance < 400) {
  //           $scope.addMarker(rackLoc, markerImg)

  //           marker = new google.maps.Marker({
  //             position: rackLoc,
  //             map: map,
  //             icon: markerImg
  //           });
  //         }
  //       });

  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   }


  //   // Adds a marker to the map and push to the array.
  //   $scope.addMarker = function(location) {
  //     var marker = new google.maps.Marker({
  //       position: location,
  //       map: map,
  //       icon: markerImg
  //     });
  //     markers.push(marker);
  //   }


  //   // REMOVE CITIBIKE MARKERS
  //   // Deletes all markers in the array by removing references to them.
  //   $scope.deleteMarkers = function () {
  //     clearMarkers();
  //     markers = [];
  //   };




  //   // document.getElementById('mode').addEventListener('change', function() {
  //   //   calculateAndDisplayRoute(directionsService, directionsDisplay);
  //   // });

  //   // // GET CITIBANK LOCATIONS
  //   // citibikeFactory.getCitiBikeLocations()
  //   //   .then(function(bikeRacks) {
  //   //     // console.log('bikeRacks ====> ', bikeRacks);
  //   //     // $scope.data.bikes = bikeRacks.data;
  //   //     // console.log('bikeRacks.data; ====> ', bikeRacks.data);
  //   //     var marker;
  //   //     var markerImg = 'https://s3.amazonaws.com/fullstackacademy/img/marker_100.png';
  //   //     var distance = 0;
  //   //     $scope.toggleMarkers = true;

  //   //     bikeRacks.data.forEach(function(rack) {
  //   //       var rackLoc = new google.maps.LatLng(rack.lat/1000000, rack.lng/1000000);
  //   //       var locM = new google.maps.LatLng(40.7465051, -73.9904466);
  //   //       distance = google.maps.geometry.spherical.computeDistanceBetween( locM, rackLoc );

  //   //       if (distance < 400) {
  //   //         marker = new google.maps.Marker({
  //   //           position: rackLoc,
  //   //           map: map,
  //   //           icon: markerImg
  //   //         });
  //   //       }
  //   //     });

  //   //   })
  //   //   .catch(function (error) {
  //   //     console.error(error);
  //   //   });

  //     // // citibike markers
  //     // $scope.getData = function () {

  //     //   citibikeFactory.getData()

  //     //   .then(function (bikeRacks) {
  //     //     console.log('---->',bikeRacks)
  //     //     $scope.data.bikes = bikeRacks.data;

  //     //     $scope.data.bikes.forEach(function(rack){
  //     //       console.log('inside forEach', rack)
  //     //       var image = 'https://s3.amazonaws.com/fullstackacademy/img/marker_100.png';
  //     //       var marker = new google.maps.Marker({
  //     //           position: {lat: rack.lat/1000000, lng: rack.lng/1000000},
  //     //           map: map,
  //     //           icon: image
  //     //           });
  //     //     })

  //     //   })

  //     // }

  // };

  // var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  //   // var selectedMode = document.getElementById('mode').value;
  //   $scope.destinationLatLng = new google.maps.LatLng($scope.locationDetails.location.coordinate.latitude, $scope.locationDetails.location.coordinate.longitude);
  //   directionsService.route({
  //     // origin: {lat: 37.77, lng: -122.447},  // Haight.
  //     // destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
  //     origin: originLocation,
  //     destination: $scope.destinationLatLng,
  //     // Note that Javascript allows us to access the constant
  //     // using square brackets and a string value as its
  //     // "property."
  //     travelMode: 'WALKING'//google.maps.TravelMode[selectedMode]
  //   }, function(response, status) {
  //     if (status == 'OK') {
  //       directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // };

  // $scope.toggleCitiBikeMarkers = function() {
  //   if (!$scope.toggleMarkers) {
  //     alert('ADD MARKERS');
  //     $scope.addMarkers();
  //   } else {
  //     alert('REMOVE MARKERS');
  //   }
  // };
  // ====================================================================================

  // INVOKE FUNCTIONS
  initMap();    // GOOGLE MAPS

});
