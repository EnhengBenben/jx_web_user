/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationOtherController',ApplicationOtherController);
  ApplicationOtherController.$inject = ['ApplicationService','$state','toaster'];
  function ApplicationOtherController(ApplicationService,$state,toaster){
    var vm = this;
    vm.home = [];
    vm.personal = personal;
    vm.save = save;
    return init();
    function init(){

      var params = {
        include:'techDuty,orgRegion,orgRank,paper,education,degree,workExp,education,adminDuty'
      }
      ApplicationService
        .settings()
        .then(function (res) {
          vm.settings = res.data.data;
        });
      ApplicationService
        .list(params)
        .then(function (res) {
          vm.other = res.data.data;
          vm.other.ID_card = vm.other.ID_card? vm.other.ID_card:[];
          vm.other.diploma = vm.other.diploma? vm.other.diploma:[];
          vm.other.degree_photo = vm.other.degree_photo? vm.other.degree_photo:[];
          vm.other.practicing_certificate = vm.other.practicing_certificate? vm.other.practicing_certificate:[];
          vm.other.qualification_certificate = vm.other.qualification_certificate? vm.other.qualification_certificate:[];

          // if(vm.other.ID_card == null){
          //   vm.other.ID_card = []
          // }

        });

      initDt();
    }
    function initDt() {

    }
    function save() {
      ApplicationService
        .editOther(vm.other)
        .then(function (res) {
          toaster.pop('success','已保存学习经历');
          $state.go('admin.jx.application.navigation.courses');
        })
    }

    function personal() {

    }

  }
})();
