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
  'MeetlyApp.authServices',
  'MeetlyApp.dataServices',
  'MeetlyApp.register',
  'MeetlyApp.login',
  'MeetlyApp.dashboard',
  'MeetlyApp.nav',
  'MeetlyApp.signout',
  'MeetlyApp.invites',
  'MeetlyApp.services',
  'MeetlyApp.invites',
  'MeetlyApp.services',
  'MeetlyApp.invites',
  'MeetlyApp.services',
  'ui.router'])

// SET STATE AND ROUTER PROVIDERS FOR SPA
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/form.html',
      authenticate: true
    })
    .state('map-view', {   
      url:'/map-view',   
      templateUrl: 'app/views/map-view.html',
      authenticate: true
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/views/register.view.html',
      controller: 'Register'      
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.view.html',
      controller: 'Login'      
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/views/dashboard.view.html',
      controller: 'Dashboard',
      authenticate: true    
    })
    .state('signout', {
      url: '/signout',
      templateUrl: 'app/views/signout.view.html',
      controller: 'Signout'      
    })
    .state('invites', {
      url: '/invites',
      templateUrl: 'app/views/invites.view.html',
      controller: 'Invites'      
    })
})

.run(function ($rootScope, $location, $window, Auth, $state) {
  // Check whether the user is authenticated to navigate to a route or not on every
  // route change.
  $rootScope.$on('$stateChangeStart', function (event, next, prev) {

    //If unauthenticated user tries to access protected page, redirect to login
    if (!Auth.isLoggedIn() && next.authenticate) {            
      event.preventDefault();      
      // $location.path('/'); // not working for some reason
      $window.location.href = '#/login';            
    }
  })
})  
