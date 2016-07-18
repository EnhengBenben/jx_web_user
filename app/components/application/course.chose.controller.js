/**
 * Created by yong on 16/5/26.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ChoseCourseController',ChoseCourseController);
  ChoseCourseController.$inject = ['CourseService','$state','$localStorage','$scope','DashboardService','toaster','ApplicationService'];
  function ChoseCourseController(CourseService,$state,$localStorage,$scope,DashboardService,toaster,ApplicationService){
    var vm = this;
    vm.sure = sure;
    vm.filter = {
     // year:'2016',
      courseId:$localStorage.courseId,
      limit:1000
    };
    vm.courseEdit = true;
    vm.courseEdit = courseEdit;
    vm.years = [];
    var y = (new Date()).getUTCFullYear() + 10;
    for (var i = 2010; i <= y; i += 1) {
      vm.years.push(i);
    }
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
        vm.editCourse = true;
      }
      $scope.$watch('vm.filter.year',function (NewValue,OldValue) {
        if(NewValue != OldValue){
          CourseService
            .list(vm.filter)
            .then(function (res) {
              vm.courses = res.data.data;
              vm.filter['course'] = vm.courses[0].id
            });
        }
      },true);
      CourseService
        .list(vm.filter)
        .then(function (res) {
          vm.courses = res.data.data;
        });


      vm.home = [{name:'住宿'},{name:'不住宿'}];
      initDt();
    }
    function courseEdit() {
      vm.editCourse = true;
    }
    function initDt() {

    }
    function sure() {
      if(vm.filter.courseId){
        var id =  vm.filter.courseId;
        DashboardService
          .application(id)  //检查选课时间是否冲突
          .then(function (res) {
            if(res.data.message == '选课时间冲突'){
              toaster.pop('error','选课时间冲突,请选择其他进修班');
              return 0;
            }else {
              DashboardService
                .infoCheck()   // 检查个人信息是否完整
                .then(function (response) {
                  if(response.data.message){
                    toaster.pop('error','个人信息不完整,请完善后申请');
                    $state.go('admin.jx.application.navigation.step.base')
                  }else {
                    //$localStorage.courseId = id;
                    DashboardService
                      .apply(vm.filter.courseId)
                      .then(function (res) {
                        $localStorage.courseId = vm.filter.courseId;
                        $localStorage.applyId = res.data.data.id;
                        vm.editCourse = false;
                        toaster.pop('success','进修班已申请,下载并提交申请表吧');
                        $state.go('admin.jx.application.navigation.show');
                      })
                  }
                })
            }
          });
      }else {
          toaster.pop('error','请先选择进修班');
      }

    }

  }
})();
