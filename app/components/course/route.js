/**
 * Created by yong on 16/5/6.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('admin.jx.course', {
          url: '/course',
          abstract: true,
          templateUrl: 'components/course/layout.html'
        })
        .state('admin.jx.course.list', {
          url: '/list',
          templateUrl: 'components/course/list.html',
          controller: 'CourseListController as vm'
        })
        .state('admin.jx.course.courseShow', {
          url: '/show/:id',
          templateUrl: 'components/course/show.html',
          controller: 'CourseShowController as vm'
        })
    });
})();
