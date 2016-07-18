(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/admin/jx/dashboard');
      $stateProvider
        .state('admin', {
          url: '/admin',
          abstract: true,
          controller: 'AdminController as admin',
          templateUrl: 'views/main.html'
        })
        .state('admin.jx',{
          url:'/jx',
          abstract:true,
          templateUrl:'components/dashboard/layout.html',
          controller:'DashboardController as vm'
        })
        .state('admin.jx.login',{
          url:'/login',
          templateUrl:'components/auth/login.html',
          controller:'LoginController as vm'
        })
        .state('admin.jx.dashboard',{
          url:'/dashboard',
          templateUrl:'components/dashboard/dashboard.html',
          controller:'DashboardController as vm'
        })
        .state('admin.jx.register',{
          url:'/register',
          templateUrl:'components/dashboard/register.html',
          controller:'RegisterController as vm'
        })
        .state('admin.jx.password',{
          url:'/password',
          templateUrl:'components/auth/password.html',
          controller:'RegisterController as vm'
        })
        .state('admin.show',{
          url:'/show/:coursesId',
          templateUrl:'components/dashboard/show.html',
          controller:'DashboardShowController as vm'
        })
    });
})();
