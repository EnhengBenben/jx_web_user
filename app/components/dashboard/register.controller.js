/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('RegisterController',RegisterController);
  RegisterController.$inject = [];
  function RegisterController(){
    var vm = this;
    return init();
    function init(){
      initDt();
    }
    function initDt() {

    }

  }
})();
