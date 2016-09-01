// SET UP FRONT-END FRAMEWORK USING ANGULARJS

// INSTANTIATE THE APPLICATION
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
