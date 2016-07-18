/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('NoticeShowController',NoticeShowController);
  NoticeShowController.$inject = ['$stateParams','NoticeService'];
  function NoticeShowController($stateParams,NoticeService){
    var vm = this;
    // vm.show = {
    //   id:$stateParams.coursesId,
    //   name:"快结婚了科技时代阿克琉斯的开始的",
    //   time:'2016-09-08 12:09:44',
    //   end_at:"2017-02-24",
    //   show_time:'2017-04-09',
    //   start_at:'2017-09-08',
    //   end:'2017-09-30',
    //   jx:'3个月',
    //   money:'10000',
    //   detail:'<p>就啊好爽就啊就看到拉开建设独立空间啊说加点辣椒是倒垃圾似的</p><h3>结束的科技时代疯狂绝世独立风景路上看见对方减肥空间书法家是</h3>'
    //
    // }
    return init();
    function init(){
      NoticeService
        .show($stateParams.id)
        .then(function (res) {
          vm.show = res.data.data;
          $('#info').html(vm.show.info);
        })
      initDt();
    }
    function initDt() {

    }

  }
})();
