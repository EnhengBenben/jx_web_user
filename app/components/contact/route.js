/**
 * Created by yong on 16/5/6.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('admin.jx.contact', {
          url: '/contact',
          abstract: true,
          templateUrl: 'components/contact/layout.html'
        })
        .state('admin.jx.contact.list', {
          url: '/list',
          templateUrl: 'components/contact/list.html',
          controller: 'ContactListController as vm'
        })
    });
})();
