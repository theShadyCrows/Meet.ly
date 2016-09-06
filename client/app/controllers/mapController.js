// CONTROLLER USED TO HANDLE INVITE RESULTS PAGE
angular.module('MeetlyApp.map', [])

.controller('mapController', function($scope, httpRequestsFactory, storeData, citibikeFactory, $sce) {
    // console.log('INIT RUNNING')
    // httpRequestsFactory.getMap()
    //   .then(function (searchResults) {
    //     // $scope.data.results = searchResults;
    //     // STORE DATA
    //     storeData.set('apiResults', searchResults);
    //     // REDIRECT TO RESULTS PAGE
    //     // $location.path('/map-view');
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });



  // GET DATA & SET VARIABLES
  // var preParseData = storeData.get('apiResults');
  // var geoLocation = storeData.get('geoLocation');

  // PARSE OBJECT DATA FOR LOCATION DETAILS AREA
  // $scope.locationDetails = preParseData.businesses[0];
  // $scope.frameUrl = $scope.trustAsResourceUrl($scope.locationDetails.url)

  // GOOGLE MAPS API  =============================================================================
  // SET VARIABLES

  // $scope.map = {};
  // $scope.map.marker;
  // $scope.map.markersArray = [];
  // $scope.map.destinationLatLng;
  // $scope.map.markerImg;

var geoLocator = function() {
  console.log('GEOLOCATOR RUNNING')
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
    geoLocation = geoLoc;
    console.log(geoLocation)
    makeRequest();
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);  
};

var makeRequest = function(){
  console.log("makeRequest running")
  httpRequestsFactory.getMap()
    .then (function(preParseData){
      var preParseData = preParseData;
      // geoLocator();
      // var geoLocation = storeData.get('geoLocation');
      console.log('GEOLOCATION')
      console.log(storeData.get('geoLocation'))
      $scope.locationDetails = preParseData.businesses[0];
      $scope.frameUrl = $sce.trustAsResourceUrl($scope.locationDetails.url)
      $scope.map = {};
      $scope.map.marker;
      $scope.map.markersArray = [];
      // $scope.map.markerImgArr = 
      // ['https://s3.amazonaws.com/fullstackacademy/img/marker_100.png',
      // "https://s3.amazonaws.com/fullstackacademy/img/marker_75.png", 
      // "https://s3.amazonaws.com/fullstackacademy/img/marker_50.png",
      // "https://s3.amazonaws.com/fullstackacademy/img/marker_0.png"];  
      $scope.map.destinationLatLng;
      $scope.map.markerImg;

      initMap();
    })
}
  // START: INIT MAP

  var initMap = function() {
    console.log('INITMAP RUNNING')
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
          //console.log('CITIBIKEDATA USED BIKES',rack.bikes);
          var rackLoc = new google.maps.LatLng(rack.lat/1000000, rack.lng/1000000);
          //console.log('RACKLOCK',rackLoc.lat(),rackLoc.lng())
          var locM = new google.maps.LatLng(40.7465051, -73.9904466);
          var geoLoc = new google.maps.LatLng(geoLocation.lat, geoLocation.lng);
           //console.log('GEOLOC',geoLoc.lat(),geoLoc.lng())
           //distance between each rack location and current geolocation of user
          var distance = google.maps.geometry.spherical.computeDistanceBetween( geoLoc, rackLoc );
          //console.log('distance',distance);

          //setting CITIBIKE marker image
          $scope.image = function () {
            if (rack.free/(rack.bikes + rack.free) >=.90) {
              $scope.map.markerImg = $scope.map.markerImgArr[0];
            }
            else if (rack.free/(rack.bikes + rack.free)>=.51 && rack.free/(rack.bikes + rack.free)<=.89) {
              $scope.map.markerImg = $scope.map.markerImgArr[1];
            }
            else if (rack.free/(rack.bikes + rack.free)>=.20 && rack.free/(rack.bikes + rack.free)<=.50) {
              $scope.map.markerImg = $scope.map.markerImgArr[2];
            }
            else {$scope.map.markerImg = $scope.map.markerImgArr[3]
            }
          }

          $scope.image()
           if (distance < 30000) {
              marker = new google.maps.Marker({
              position: rackLoc,
              map: map,
              icon: $scope.map.markerImg
            });

            $scope.map.markersArray.push(marker)

            }
        });

      })
      .catch(function (error) {
        console.error(error);
      });
    }
     // Removes the markers from the map, but keeps them in the array.
      $scope.clearMarkers = function() {
        $scope.setMapOnAll(null);
        //console.log('inside clearMarkers',$scope.setMapOnAll(null));
      }
        //sets the markers onto the page
      $scope.setMapOnAll= function(map) {
        for (var i = 0; i < $scope.map.markersArray.length; i++) {
          $scope.map.markersArray[i].setMap(map);
          //(console.log('inside setMap', $scope.map.markersArray[i]))
        }
      }

  };

geoLocator();

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


    // $scope.removeMarkers = function () {

    //   if ($scope.flag) {
    //     console.log('flag',$scope.flag)
    //     console.log('marker in REMOVE MARKERS',$scope.map.markersArray)
    //     $scope.map.markersArray.splice(0,$scope.map.markersArray.length)
    //         console.log('removeMarkers', $scope.map.markersArray)
    //   }
    // }

        // $scope.visible = true;
        // $scope.addMarkers = function () {
        //   console.log('testtest$$$')
        //     $scope.visible = !$scope.visible;
        // };
  // $scope.map.toggleMarkers = true;

  // // START: TOGGLE CITIBIKE MARKERS
  // $scope.toggleCitiBikeMarkers = function() {
  //   if (!$scope.map.toggleMarkers) {
  //     alert('ADD MARKERS');
  //     $scope.addMarkers();
  //   } else {
  //     alert('REMOVE MARKERS');
  //   }
  // };
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
  // initMap();    // GOOGLE MAPS

});
