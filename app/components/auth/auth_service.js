'use strict';

angular.module('merchantApp')
  .service('AuthService', AuthService);

AuthService.$inject = ['ENDPOINT', '$http'];

function AuthService(ENDPOINT, $http) {
  return {
    login: login,
    hospital:hospital
  };

  function hospital() {
    return $http({
      url:ENDPOINT + '/settings/hospital-name',
      method:'GET'
    })
  }

  function login(data) {
    return $http({
      method: 'POST',
      url: ENDPOINT + '/auth/login',
      data: data
    });
  }
}
