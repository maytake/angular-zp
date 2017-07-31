'use strict';
angular.module('app').controller('bannerCtrl', ['$http', '$state', '$scope', function($http, $state, $scope){
  $http.get('data/banner.json?id='+$state.params.id).success(function(resp){
    $scope.banner = resp;
  });
}]);
