'use strict';

angular.module('merchantApp')
  .controller('AdminController', AdminController);

AdminController.$inject = ['$state', '$localStorage', '$uibModal','$interval','$timeout','AuthService'];

function AdminController($state, $localStorage, $uibModal,$interval,$timeout,AuthService) {
  var admin = this;
  admin.logout = logout;
  admin.openPublishDialog = openPublishDialog;
  admin.chose =  0;
  return init();

  function init() {

    AuthService
      .hospital()
      .then(function (res) {
        admin.hospital = res.data;
      });

    var one = $interval(function () {
      admin.chose++;
    },3000,2)
  var banner = $interval(function () {
    admin.chose = 0;
    var one = $interval(function () {
      admin.chose++;
    },3000,2)
  },9000)
  }

  function logout() {
    $localStorage.token = null;
    $state.go('login');
  }

  function openPublishDialog() {
    $uibModal.open({
      animation: true,
      templateUrl: 'components/publish/dialog.html',
      controller: 'PublishDialogController as vm',
      size: 'md'
    });
  }
}
