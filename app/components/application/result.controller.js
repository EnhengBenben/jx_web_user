/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationResultController',ApplicationResultController);
  ApplicationResultController.$inject = ['ApplicationService'];
  function ApplicationResultController(ApplicationService){
    var vm = this;
    return init();
    function init(){
      ApplicationService
        .application()
        .then(function (res) {
          angular.forEach(res.data.data,function (i) {
          
          })

        })
      initDt();
    }
    function initDt() {

    }

  }
})();
