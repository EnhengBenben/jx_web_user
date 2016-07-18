'use strict';

angular.module('merchantApp')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', '$localStorage', 'toaster', 'AuthService','$state'];

function LoginController($scope, $location, $localStorage, toaster, AuthService,$state) {
  var vm = this;
  $scope.$localStorage = $localStorage;
  vm.logout = logout;
  vm.login = login;
  return init();

  function init() {}

  function login() {
    AuthService
      .login(vm.user)
      .success(function(response) {
        vm.username = vm.user.username;
        $localStorage.username = vm.username;
        $localStorage.token = response.data.auth_token;
        $state.go('admin.jx.dashboard');
        toaster.pop('success','已成功登陆');
      })
      .error(function(response) {
        toaster.pop('error', '登录失败', response.message);
      });
  }

  function logout() {
    alert(1);
    $localStorage.token = null;
    toaster.pop('success','已退出');
  }
}
