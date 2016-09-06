angular.module('MeetlyApp.dataServices',[])
.factory('Data', function($http, Auth){

    var getProfile = function () {
      return $http.get('/api/dashboard', {
        headers: {
          Authorization: 'Bearer '+ Auth.getToken()
        }
      });
    };

    var getInvites = function(){
      return $http.get('/api/invites', {
        headers: {
          Authorization: 'Bearer '+ Auth.getToken()
        }
      });      

    }



    return {
      getProfile : getProfile,
      getInvites: getInvites
    };

})


//**** add function for getting Invite info *****///