// Set up our Front-End Framework using AngularJS

  // Instantiate the app
  angular.module('MeetlyApp', ['MeetlyApp.form', 'MeetlyApp.services']);

  /*
  // ???
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
      })
      .when('/signup', {
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController'
      })
      // Your code here

      .when('/links', {
        templateUrl: 'app/links/links.html',
        controller: 'LinksController',
        authenticate: true
      })
      .when('/shorten', {
        templateUrl: 'app/shorten/shorten.html',
        controller: 'ShortenController',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/links'
      });
  });
    */