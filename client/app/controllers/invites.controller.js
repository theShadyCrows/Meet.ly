angular.module('MeetlyApp.invites', [])
.controller('Invites', function($scope, $location, Data){
  $scope.invite = {
    
  };

//****** CHANGE below to get invite data *******//
//probably very similar. difference is gonna be on 
//server side
  Data.getInvites()
    .success(function(data){
      $scope.invite = data;
    })
    .error(function(error){
      console.log(error);
    });

})
