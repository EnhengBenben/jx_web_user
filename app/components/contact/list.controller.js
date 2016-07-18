(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ContactListController',ContactListController);
  ContactListController.$inject = ['ContactService'];
  function ContactListController(ContactService){
    var vm = this;
    return init();
    function init(){
      ContactService
        .list()
        .then(function (res) {
          vm.showList = res.data;
          $('#info').html(res.data[0].con_info);
        })
    }


  }
})();
