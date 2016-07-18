/**
 * Created by yong on 16/5/6.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('admin.jx.application', {
          url: '/application',
          abstract: true,
          templateUrl: 'components/application/layout.html',
          //controller:'NavigationController as vm'
        });
      $stateProvider
        .state('admin.jx.application.navigation', {
          url: '/navigation',
          abstract: true,
          templateUrl: 'components/application/navigation.html',
          controller:'NavigationController as vm'
        })
        .state('admin.jx.application.navigation.show', {
          url: '/show?year&courseId',
          templateUrl: 'components/application/show.html',
          controller: 'ApplicationShowController as vm'
        })
        .state('admin.jx.application.navigation.courses', {
          url: '/courses',
          templateUrl: 'components/application/chose-courses.html',
          controller: 'ChoseCourseController as vm'
        })
        .state('admin.jx.application.navigation.submit', {
          url: '/submit?year&courseId',
          templateUrl: 'components/application/submit.html',
          controller: 'ApplicationSubmitController as vm'
        })
        .state('admin.jx.result', {
          url: '/result',
          templateUrl: 'components/application/result.html',
          controller: 'NavigationController as vm'
        });

      //填写申请信息
      $stateProvider
        .state('admin.jx.application.navigation.step', {
          url: '/step',
          abstract: true,
          templateUrl: 'components/application/step.html'
        })
        .state('admin.jx.application.navigation.step.base', {
          url: '/base',
          templateUrl: 'components/application/write/base.html',
          controller: 'ApplicationBaseController as vm'
        })
        .state('admin.jx.application.navigation.step.work', {
          url: '/work',
          templateUrl: 'components/application/write/work.html',
          controller: 'ApplicationWorkController as vm'
        })
        .state('admin.jx.application.navigation.step.study', {
          url: '/study',
          templateUrl: 'components/application/write/study.html',
          controller: 'ApplicationStudyController as vm'
        })
        .state('admin.jx.application.navigation.step.other', {
          url: '/other',
          templateUrl: 'components/application/write/other.html',
          controller: 'ApplicationOtherController as vm'
        })
    });
})();
