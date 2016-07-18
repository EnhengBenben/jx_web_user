/**
 * Created by yong on 16/5/6.
 */
'use strict';

angular.module('merchantApp')
.service('CourseService',CourseService);
CourseService.$inject = ['$http','ENDPOINT'];
function CourseService($http,ENDPOINT) {

  return{
    list:list,
    show:show,
  };

  function list(params) {
    return $http({
      url:ENDPOINT + '/courses',
      method:'GET',
      params:params
    })
  }
  function show(id) {
    return $http({
      url:ENDPOINT + '/courses/' + id,
      method:'GET'
    })
  }
}
