(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('NoticeListController',NoticeListController);
  NoticeListController.$inject = ['$compile', '$scope', '$stateParams', 'toaster', 'DTOptionsBuilder', 'DTColumnBuilder','NoticeService'];
  function NoticeListController($compile, $scope, $stateParams, toaster, DTOptionsBuilder, DTColumnBuilder,NoticeService){
    var vm = this;
    vm.login = login;
    vm.user = {};
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
          [1, 'desc']
        ]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn('name').withTitle('公告名称').renderWith(nameHtml),
        DTColumnBuilder.newColumn('end_at').withTitle('发布时间').withOption("width","90px").renderWith(function(data) {
          return moment(data).format('YYYY-MM-DD');
        })
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      params['status'] = vm.status;
       NoticeService.list(params)
        .then(function(res) {
          vm.showList = res.data.data;
          callback(convertDtResponse(res.data));
        });
    }

    function nameHtml(data, type, full, meta) {
      return '<a ui-sref="admin.jx.notice.noticeShow({id: ' + full.id + '})">' + data + '</a>';
    }


    function actionsHtml(data, type, full, meta) {
      return '<button class="btn btn-white btn-xs" uib-tooltip="申请" ui-sref="admin.conferences.edit({conferenceId: ' + data.id + '})">' +
        '   <i class="fa fa-fw fa-edit"></i>' +
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
          $localStorage.token = response.data.auth_token;
          $location.path('/admin/shops/list');
        })
        .error(function(response) {
          toaster.pop('error', '登录失败', response.message);
        });
    }
  }
})();
