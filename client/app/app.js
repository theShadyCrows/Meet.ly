// Set up our Front-End Framework using AngularJS

// Instantiate the app
angular.module('MeetlyApp', [
  'MeetlyApp.form',
  'MeetlyApp.map',
  'MeetlyApp.services',
  'MeetlyApp.authServices',
  'MeetlyApp.dataServices',
  'MeetlyApp.register',
  'MeetlyApp.login',
  'MeetlyApp.dashboard',
  'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/',
        templateUrl: 'app/views/form.html'
    })
    .state('map-view', {      
      url: '/map-view',
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
      controller: 'Dashboard'      
    })



})

.run(function ($rootScope, $location, $window, Auth, $state) {
  console.log('run running')
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

// .run(function ($rootScope, $location, $window, Auth, $state) {
//   console.log('run running')
//   // Check whether the user is authenticated to navigate to a route or not on every
//   // route change.  

//   $window.addEventListener('$stateChangeStart', function(event, next, prev) {
//     $rootScope.$apply(function() {
//       console.log('statechange')
//       if (!Auth.isLoggedIn() && next.authenticate) {      
//         // Stop any defaults (such as page refreshes on form submissions)
//         event.preventDefault();
//         console.log('redirect to login')
//         $location.path('/');
//         console.log('last')
//         // $location.path('/');
//     }

//   })
//   })
// })



