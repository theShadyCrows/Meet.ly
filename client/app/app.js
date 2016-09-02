// SET UP FRONT-END FRAMEWORK USING ANGULARJS

// INSTANTIATE THE APPLICATION
/*
    APPLICATION DETAILS:
    MeetlyApp         // DIRECTIVE THAT DEFINES & LINKS APP TO HTML PAGE
    MeetlyApp.form    // CONTROLLER FOR FORM SUBMISSION [app/controlers/formController.js]
    MeetlyApp.map     // CONTROLLER FOR INVITE RESULTS [app/controlers/mapController.js]
    MeetlyApp.yelp    // CONTROLLER FOR YELP CONTENT [app/controlers/yelpController.js]
    ui.router         // FOR SWITCHING VIEWS IN THE BROWSER
*/
angular.module('MeetlyApp', [
  'MeetlyApp.form',
  'MeetlyApp.map',
  'MeetlyApp.yelp',
  'MeetlyApp.services',
  'ui.router'
])

// SET STATE AND ROUTER PROVIDERS FOR SPA
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/form.html'
    })
    .state('map-view', {
      url: '/map-view',
      templateUrl: 'app/views/map-view.html'
    });
    
});
