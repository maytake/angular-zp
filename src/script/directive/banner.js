'use strict';

angular.module('app').directive('swipers', ['$timeout',function swipers($timeout) {
    return {
        restrict: "EA",
        scope: {
            data: "="
        },
        templateUrl: 'view/template/banner.html',
        link: function(scope, element, attrs) {
            $timeout(function() {
                var swiper = new Swiper('.swiper-container', { //轮播图绑定样式名
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 2500,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                });
            }, 100);
        }
    };
}]);



