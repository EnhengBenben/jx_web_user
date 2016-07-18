/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationBaseController',ApplicationBaseController);
  ApplicationBaseController.$inject = ['ApplicationService','$state','toaster'];
  function ApplicationBaseController(ApplicationService,$state,toaster){
    var vm = this;
    vm.genders = [{name:"男"},{name:"女"}];
    vm.political = [{name:"团员"},{name:"中共党员"},{name:"群众"},{name:"无党派民主人士"},{name:"其他"}];
    vm.marital = [{name:"已婚"},{name:"未婚"}];
    vm.health = [{name:"良好"},{name:"一般"},{name:"较差"}];
    vm.save = save;

    return init();
    function init(){

      var params = {
        include:'relative,director'
      }

      ApplicationService
        .list(params)
        .then(function (res) {
          vm.base = res.data.data;
          if(!vm.base.photo){
            vm.base['photo'] = [];
          }
          if(vm.base.birthday == '0000-00-00'){
            vm.base['birthday'] = '';
          }
        })

    }
    function save() {
      if(vm.base.relative&&vm.base.director){
        vm.base['relative_name'] = vm.base.relative.data.name || null;
        vm.base['relative_relationship'] = vm.base.relative.data.relationship || null;
        vm.base['relative_mobile'] = vm.base.relative.data.mobile || null;
        vm.base['director_name'] = vm.base.director.data.name || null;
        vm.base['director_duty'] = vm.base.director.data.duty || null;
        vm.base['director_mobile'] = vm.base.director.data.mobile || null;
      }
      ApplicationService
        .editBase(vm.base)
        .then(function (res) {
          $state.go('admin.jx.application.navigation.step.work');
          toaster.pop('success','信息已保存');
        })
    }

  }
})();
