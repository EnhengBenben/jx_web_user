/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationSubmitController',ApplicationSubmitController);
  ApplicationSubmitController.$inject = ['ApplicationService','$state','$localStorage','toaster','CourseService','$scope'];
  function ApplicationSubmitController(ApplicationService,$state,$localStorage,toaster,CourseService,$scope){
    var vm = this;
    vm.add = {
      attachments:[]
    }
    vm.tag = false;
    vm.submit = submit;
    return init();
    function init(){

      if($localStorage.courseId){
        CourseService
          .show($localStorage.courseId)
          .then(function (res) {
            vm.course = {
              name:res.data.data.name
            }
          })
      }else {
        toaster.pop('error','请先选择进修班');
        $state.go('admin.jx.application.navigation.courses');
      }


      vm.home = [{id:true,name:'住宿'},{id:false,name:'不住宿'}]
      ApplicationService
        .accommodation()
        .then(function (res) {
          vm.accommodation = res.data.data;
          vm.tag = true

        })
    }
    function submit() {
      if($localStorage.applyId){
        ApplicationService
          .submit($localStorage.applyId,vm.add)
          .then(function (res) {
            $localStorage.applyId = null;
            $localStorage.courseId = null;
            toaster.pop('success','申请表已提交,请耐心等待审核');
            $state.go('admin.jx.result')
          })
      }else {
        toaster.pop('error','请选择进修班后提交');
        $state.go('admin.jx.application.navigation.courses');
      }


    }
    function sure() {
      $state.go('admin.jx.application.navigation.show');
    }

  }
})();
