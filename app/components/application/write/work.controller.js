/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationWorkController',ApplicationWorkController);
  ApplicationWorkController.$inject = ['ApplicationService','toaster','$state'];
  function ApplicationWorkController(ApplicationService,toaster,$state){
    var vm = this;
    vm.save = save;
    vm.send = true;
    vm.work = []
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
          vm.add = res.data.data;
          vm.work= res.data.data.workExp.data
        });
      initDt();
    }
    function initDt() {
      vm.removeOption = function(index) {
        if(vm.work.length == 1){
          vm.work.splice(0, 1);
        }else {
          vm.work.splice(index, 1);
        }
      };

      vm.addOption = function() {
        vm.work.push({
          tech_duty: '',
          end_date:'',
          org_name:'',
          admin_duty:'',
          start_date:''

        });
      };

    }
    function save() {
      vm.send = true;
       vm.add['workExps'] = vm.work;
       angular.forEach(vm.work,function (i) {
         if(i.tech_duty == '' || i.start_date == '' || i.end_date == '' || i.org_name == '' || i.admin_duty == ''){
           vm.send = false;
         }
       });
       if(vm.send) {
         ApplicationService
           .editWork(vm.add)
           .then(function (res) {
             toaster.pop('success','已保存工作信息');
             $state.go('admin.jx.application.navigation.step.study');
           })
       }
     else {
       toaster.pop('error','请完善工作经历');
     }


    }

  }
})();
