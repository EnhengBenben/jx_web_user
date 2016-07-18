/**
 * Created by yong on 16/5/6.
 */
'use strict';

angular.module('merchantApp')
.service('ContactService',ContactService);

ContactService.$inject = ['$http','ENDPOINT'];
function ContactService($http,ENDPOINT) {

  return{
    list:list,
  };

  function list() {
    return $http({
      url:ENDPOINT + '/contacts',
      method:'get',
    })
  }

}
