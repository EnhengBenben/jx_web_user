(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('DashboardService', DashboardService);

  DashboardService.$inject = ['$http','ENDPOINT'];
  /* @ngInject */
  function DashboardService($http,ENDPOINT) {
    return {
      dashboard:dashboard,
      application:application,
      infoCheck:infoCheck,
      apply:apply
    } ;

    function apply(id) {
      return $http({
        url:ENDPOINT + '/apply/' + id,
        method:'GET'
      })
    }
    function infoCheck() {
      return $http({
        url:ENDPOINT + '/info-complete-check',
        method:'GET'
      })
    }

    function application(id) {
      return $http({
        url:ENDPOINT +'/course-time-check/' + id,
        method:'GET'
      })
    }
    function dashboard(){
      return $http({
        url:ENDPOINT + '/dashboard',
        method:'GET'
      })
    }


  }
})();
