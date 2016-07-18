/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('CourseShowController',CourseShowController);
  CourseShowController.$inject = ['$stateParams','CourseService'];
  function CourseShowController($stateParams,CourseService){
    var vm = this;
    return init();
    function init(){
      CourseService
        .show($stateParams.id)
        .then(function (res) {
          vm.show = res.data.data;
          $("#show").html(vm.show.detail_info);
        });
      initDt();
    }
    function initDt() {

    }

  }
})();
