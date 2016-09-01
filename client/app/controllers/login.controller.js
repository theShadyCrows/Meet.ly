angular.module('MeetlyApp.login', [])

.controller('Login', function($scope, $location, Auth){
  $scope.credentials = {
    email : "",
    password : ""
  };

  $scope.onSubmit = function () {
    Auth
      .login($scope.credentials)
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('home');
      });
  };

})
