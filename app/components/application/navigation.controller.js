/**
 * Created by yong on 16/5/21.
 */
'use strict';

angular.module('merchantApp')
.controller('NavigationController',NavigationController);
NavigationController.$inject = ['CourseService','$state','ApplicationService','$scope','toaster','ExportService'];
function NavigationController(CourseService,$state,ApplicationService,$scope,toaster,ExportService) {
  var vm = this;
  $scope.$state = $state;
  vm.confirm = confirm;
  vm.remove = remove;
  vm.pass = pass;
  vm.applicationCourse = true;
  vm.enrollment = enrollment;//下载报道须知
  vm.downloadEnrollment = downloadEnrollment;//下载录取通知书
  vm.target = 0;
  var params = {
    include:'course,transferCourse'
  };


  return init();

  function init() {
//(moment().format('YYYY-MM-DD') >= i.course.announcement_date)

    ApplicationService
      .application(params)
      .then(function (res) {
        if(res.data.data.length) {
          vm.courses=[];
          angular.forEach(res.data.data, function (i) {
            //var pass = moment().min(moment(), i.course.announcement_date);
            if (i.status != '未提交申请表') {
              // vm.course = res.data.data[0].id;
              // vm.courses.push(i);
              if(i.transferCourse){
                i.transferCourse.data['applicationId'] = i.id;
                vm.courses.push(i.transferCourse.data);
              }else {
                i.course.data['applicationId'] = i.id;
                vm.courses.push(i.course.data);
              }
            }
          });
          console.log(vm.courses);
          if(vm.courses.length){
            vm.course = vm.courses[0].applicationId;
          }else {
            vm.showDefault = true;
          }
        }else {
          vm.showDefault = true;
        }
        if(res.data.data.length ==1 && res.data.data[0].status == '未提交申请表'){
          vm.showDefault = true;
        }
      });
    $scope.$watch('vm.course',function (oldValue,newValue) {
      if (newValue != oldValue ){
        ApplicationService
          .select(vm.course,params)
          .then(function (res) {
            if(res.data.data) {
              if(res.data.data.status == '建议通过' || res.data.data.status == '建议拒绝' || res.data.data.status == '建议调班'){
                res.data.data.status = '待审核';
              }
              vm.application = res.data.data;
             // var pass = moment().min(moment(), res.data.data.course.announcement_date);
             //  if(res.data.data.status == '申请未通过'){
             //    vm.application=res.data.data;
             //  }else {
             //    vm.application = res.data.data;
             //  }
                // }else if (moment().format('YYYY-MM-DD') < res.data.data.course.data.announcement_date) {
                //   res.data.data.status = '待审核';
                //   vm.application=res.data.data;
                // }
              // if(moment().format('YYYY-MM-DD') < res.data.data.course.data.announcement_date){
              //
              // }
            }
            if(!vm.application){
              vm.showDefault = true;
            }
          })
      }
    },true);
  }


  function remove(id) {

    ApplicationService
      .remove(id)
      .then(function (res) {
        toaster.pop('success','取消成功');
        location.reload();
      })
  }

  function enrollment(id) {
    ApplicationService
      .enrollment(id)
      .then(function (res) {
        //debugger;
        var a = document.createElement('a');
        a.href = res.data[0].url;
        a.target = '_blank';
        a.download = '进修须知';
        document.body.appendChild(a);
        a.click();
      })

  }
  function downloadEnrollment(id) {
    ExportService
      .exportFile('/application/'+ id +'/downloadEnrollment','录取通知书')
      .then(function (res) {

      })
  }

  function confirm(id,e) {
    vm.data = {
      confirm:e
    }
    ApplicationService
      .confirm(id,vm.data)
      .then(function (res) {
        location.reload();
      })
  }
  function pass(id,e) {
    vm.data = {
      confirm:e
    }
    ApplicationService
      .confirm(id,vm.data)
      .then(function (res) {
        location.reload();
      })
  }
}
