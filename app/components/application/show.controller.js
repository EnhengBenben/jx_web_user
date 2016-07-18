/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationShowController',ApplicationShowController);
  ApplicationShowController.$inject = ['ApplicationService','toaster','$state','DashboardService','ExportService','$localStorage','CourseService'];
  function ApplicationShowController(ApplicationService,toaster,$state,DashboardService,ExportService,$localStorage,CourseService){
    var vm = this;
    vm.exportApplication = exportApplication;
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




      DashboardService
        .infoCheck()   // 检查个人信息是否完整
        .then(function (response) {
          if (response.data.message) {
            toaster.pop('error', '个人信息不完整,请完善后申请');
            $state.go('admin.jx.application.navigation.step.base')
          }
        });
      var params = {
        include:'techDuty,orgRegion,orgRank,paper,education,degree,workExp,adminDuty,relative,director'};
      ApplicationService
        .list(params)
        .then(function (res) {
          vm.show = res.data.data;
        });
      initDt();
    }
    function initDt() {

    }
    function exportApplication() {
      if($localStorage.applyId){
        ExportService
          .exportFile('/application/' + $localStorage.applyId + '/downloadApplication', "申请表")
          .then(function (res) {

          })
      }else {
        toaster.pop('error','请选择进修班后下载');
        $state.go('admin.jx.application.navigation.courses');
      }

    }

  }
})();
