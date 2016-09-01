angular.module('MeetlyApp.signout', [])

.controller('Signout', function($scope, $location, Auth){

    (function() {
      console.log('signing out');
        Auth.logout();
        $location.path('login');
    })();

})
