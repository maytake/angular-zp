'use strict';
angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope) {
    $http.get('/data/positionList.json').success(function(resp) {
        $scope.list = resp;
    });
    $http.get('/data/banner.json').success(function(resp) {
        $scope.bannerCtrl = resp;
    });

    $scope.swiper = {};
    $scope.next = function() {
        $scope.swiper.slideNext();
    };
    $scope.onReadySwiper = function(swiper) {
        console.log('onReadySwiper');
        swiper.on('slideChangeStart', function() {
            console.log('slideChangeStart');
        });
    };
}]);