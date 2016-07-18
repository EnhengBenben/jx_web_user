/**
 * Created by yong on 16/5/6.
 */
'use strict';

angular.module('merchantApp')
  .service('NoticeService',NoticeService);
NoticeService.$inject = ['$http','ENDPOINT'];
function NoticeService($http,ENDPOINT) {
  return{
    list:list,
    show:show,
  };

  function show(id) {
    return $http({
      url:ENDPOINT + '/announcements/' + id,
      method:'GET'
    })
  }

  function list(params) {
    return $http({
      url:ENDPOINT + '/announcements',
      method:'GET',
      params:params
    })
  }
}
