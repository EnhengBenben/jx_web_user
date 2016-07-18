(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('CourseListController',CourseListController);
  CourseListController.$inject = ['$compile','$state', '$scope', '$stateParams', 'toaster', 'DTOptionsBuilder', 'DTColumnBuilder','CourseService','DashboardService','$localStorage'];
  function CourseListController($compile,$state, $scope, $stateParams, toaster, DTOptionsBuilder, DTColumnBuilder,CourseService,DashboardService,$localStorage){
    var vm = this;
    vm.user = {};
    vm.applicationCourse = applicationCourse;
    vm.years = [];
    var y = (new Date()).getUTCFullYear() + 10;
    for (var i = 2010; i <= y; i += 1) {
      vm.years.push(i);
    }
    return init();
    function init(){
      initDt();

      $scope.$watch('vm.filter', function(newValue, oldValue) {
        if (newValue != oldValue) {
          vm.dtInstance.reloadData();
        }
      }, true);
    }

    function initDt() {
      vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', dtAjax)
        .withDataProp('data')
        .withOption('createdRow', createdRow)
        .withOption('order', [
          [2, 'desc']
        ]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').notSortable().renderWith(function(data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }).notSortable().withOption('width','80px'),
        DTColumnBuilder.newColumn('name').withTitle('进修班名称').renderWith(nameHtml),

        DTColumnBuilder.newColumn('application_deadline').withTitle('申请截止时间').withOption('width','120px').renderWith(function(data) {
          return moment(data).format('YYYY-MM-DD');
        }),
        DTColumnBuilder.newColumn('period').withTitle('进修时间').withOption('width','120px'),
        DTColumnBuilder.newColumn('student_range').withTitle('招生人数').withOption('width','80px'),
        DTColumnBuilder.newColumn('fee').withTitle('进修费用').withOption('width','80px'),
        DTColumnBuilder.newColumn(null).withTitle('立即进修').withOption('width','80px').notSortable().renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      //params['status'] = vm.status;
      angular.extend(params,vm.filter);
       CourseService.list(params)
         .then(function(res) {
           vm.showList = res.data.data;
           callback(convertDtResponse(res.data));
         });
    }

    function nameHtml(data, type, full, meta) {
      return '<a ui-sref="admin.jx.course.courseShow({id: ' + full.id + '})">' + data + '</a>';
    }


    function actionsHtml(data, type, full, meta) {
      return '<button class="btn btn-white btn-xs" uib-tooltip="申请" ng-click="vm.applicationCourse(' + data.id + ')">' +
        '<i class="fa fa-graduation-cap" aria-hidden="true"></i>' +
        '</button>'
    }


    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }


    function applicationCourse(id) {
      $localStorage.courseId = id;
      toaster.pop('success','请检查个人信息并完成申请步骤');
      $state.go('admin.jx.application.navigation.step.base');
    }
  }
})();
