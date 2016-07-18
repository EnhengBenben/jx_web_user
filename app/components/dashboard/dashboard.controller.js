(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('DashboardController',DashboardController);
  DashboardController.$inject = ['$rootScope','NoticeService','$state','CourseService','$localStorage','DashboardService','$compile', '$scope', '$stateParams', 'toaster', 'DTOptionsBuilder', 'DTColumnBuilder','AuthService'];
  function DashboardController($rootScope,NoticeService,$state,CourseService,$localStorage,DashboardService,$compile, $scope, $stateParams, toaster, DTOptionsBuilder, DTColumnBuilder,AuthService){
    var vm = this;
    vm.login = login;
    vm.logout = logout;
    vm.applicationCourse = applicationCourse;
    vm.$localStorage = $localStorage;
    $scope.$state = $state;
    $scope.$localStorage = $localStorage;
    vm.currentStateName = $state.$current.name;
    vm.includes = $state.includes('admin.jx.application');
    return init();
    function init(){
        initDt();
      $scope.$watch('vm.filter', function(newValue, oldValue) {
        if (newValue != oldValue) {
          vm.dtInstance.reloadData();
        }
      }, true);
      var params = {
        limit:8,
        order_by:'published_at:asc'
      };
      NoticeService
        .list(params)
        .then(function (res) {
          vm.notices = res.data.data;
          if(!vm.notices.length){
            vm.default = true;
          }
        })
    }

    function initDt() {
      vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', dtAjax)
        .withDataProp('data')
        .withOption('createdRow', createdRow)
        .withDisplayLength (5)
        .withOption ( 'bLengthChange', false)
        .withOption ( 'bFilter', false)
        .withOption('bPaginate', false)
        .withOption('bInfo', false)
        .withOption('order', [
          [2, 'desc']
        ]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }),
        DTColumnBuilder.newColumn('name').withTitle('进修班名称').renderWith(nameHtml).notSortable(),

        DTColumnBuilder.newColumn('application_deadline').withTitle('申请截止时间').withOption('width','120px').renderWith(function(data) {
          return moment(data).format('YYYY-MM-DD');
        }).notSortable(),
        DTColumnBuilder.newColumn('period').withTitle('进修时间').withOption('width','120px').notSortable(),
        DTColumnBuilder.newColumn('student_range').withTitle('招生人数').withOption('width','80px').notSortable(),
        DTColumnBuilder.newColumn('fee').withTitle('进修费用').withOption('width','80px').notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('立即进修').withOption('width','80px').renderWith(actionsHtml).notSortable()
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      params['limit'] = 5;
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


    function login() {
        AuthService
          .login(vm.user)
          .success(function(response) {
            vm.username = vm.user.username;
            $localStorage.username = vm.username;
            $localStorage.token = response.data.auth_token;
            toaster.pop('success','已成功登陆');
          })
          .error(function(response) {
            toaster.pop('error', '登录失败', response.message);
          });
      }
    function applicationCourse(id) {
      $localStorage.courseId = id;
      toaster.pop('success','请检查个人信息并完成申请步骤')
      $state.go('admin.jx.application.navigation.step.base');
    }
    function logout() {
      $localStorage.token = null;
      $localStorage.username = null;
      $localStorage.courseId = null;
      toaster.pop('success','已退出');
      $state.go('admin.jx.dashboard');
    }
    }
})();
