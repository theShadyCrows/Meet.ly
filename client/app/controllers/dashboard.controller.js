angular.module('MeetlyApp.dashboard', [])
.controller('Dashboard', function($scope, $location, Data){
  $scope.user = {};

  Data.getProfile()
    .success(function(data){
      $scope.user = data;
    })
    .error(function(error){
      console.log(error);
    });
})
