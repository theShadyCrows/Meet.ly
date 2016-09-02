angular.module('MeetlyApp.register', [])
.controller('Register', function($scope, $location, Auth ){
  $scope.data = {};
  $scope.credentials = {
    name : "",
    email : "",
    password : ""
  };

  $scope.onSubmit = function () {
    console.log('Submitting registration');
    Auth
      .register($scope.credentials)
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('profile');
      });
  };

  

})
