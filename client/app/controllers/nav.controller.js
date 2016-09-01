angular.module('MeetlyApp.nav', [])

.controller('Nav', function($scope, $location, Auth){

    $scope.isLoggedIn = Auth.isLoggedIn();

    $scope.currentUser = Auth.currentUser();

    $scope.onSub = function () {
        Auth
          .logout()
          .error(function(err){
            alert(err);
          })
          .then(function(){
            $location.path('login');
          });
  };

})
