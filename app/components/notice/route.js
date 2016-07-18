/**
 * Created by yong on 16/5/6.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('admin.jx.notice', {
          url: '/notice',
          abstract: true,
          templateUrl: 'components/notice/layout.html'
        })
        .state('admin.jx.notice.list', {
          url: '/list',
          templateUrl: 'components/notice/list.html',
          controller: 'NoticeListController as vm'
        })
        .state('admin.jx.notice.noticeShow', {
          url: '/show/:id',
          templateUrl: 'components/notice/show.html',
          controller: 'NoticeShowController as vm'
        })
    });
})();
