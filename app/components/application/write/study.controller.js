/**
 * Created by yong on 16/5/9.
 */
(function(){
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationStudyController',ApplicationStudyController);
  ApplicationStudyController.$inject = ['ApplicationService','$state','toaster'];
  function ApplicationStudyController(ApplicationService,$state,toaster){
    var vm = this;
    vm.save = save;
    vm.showList = true;
    vm.add = {};
    vm.add.education = {
      data:[]
    };
    vm.add.paper = {
      data:[]
    };
    return init();
    function init(){

      var params = {
        include:'techDuty,orgRegion,orgRank,paper,education,degree,workExp,education,adminDuty'
      }
      ApplicationService
        .settings()
        .then(function (res) {
          vm.settings = res.data.data;
        });
      ApplicationService
        .list(params)
        .then(function (res) {
          vm.add = res.data.data;
          if(res.data.data){
            vm.showList = false;
          }
          if(vm.add.graduate_date == '0000-00-00'){
            vm.add['graduate_date'] = '';
          }
        });
      initDt();
    }
    function initDt() {
      vm.removeOption = function(index) {
        if(vm.add.education.data.length == 1){
          vm.add.education.data.splice(0, 1);
        }else {
          vm.add.education.data.splice(index, 1);
        }
      };

      vm.addOption = function() {
        if(!vm.add.education.data){
          vm.add.education.data = [];
        }
        vm.add.education.data.push({
          start_date: '',
          graduate_date:'',
          school_name:'',
          major:'',
          degree:''
        });
      };


      vm.removePage = function(index) {

        if(vm.add.paper.data.length == 1){
          vm.add.paper.data.splice(0, 1);
        }else {
          vm.add.paper.data.splice(index, 1);
        }
      };

      vm.addPage = function() {
        vm.add.paper.data.push({
          title: '',
          date:'',
          journal:'',

        });
      };

    }
    function save() {
      console.log(vm.add.education.data);
      vm.send = true;
      vm.educationExp = true;
      vm.artitle = true;
      //vm.study = vm.add;
      vm.study = angular.copy(vm.add);
      console.log(vm.add.education.data);
      vm.study['education'] = vm.study.education.data;
      //angular.extend(vm.study.education,vm.add.education.data);
      console.log(vm.study.education);
      vm.study['papers'] = vm.add.paper.data;
      console.log(vm.study.education);
      angular.forEach(vm.study.education,function (i) {
        if(i.start_date == '' || i.graduate_date == '' || i.school_name == '' || i.major == '' || i.degree == ''){
          vm.send = false;
          vm.educationExp = false;
        }
      });
      angular.forEach(vm.add.paper.data,function (i) {
        if(i.title == '' || i.date == '' || i.journal == '' ){
          vm.send = false;
          vm.artitle = false;
        }
      });
      if(vm.send && vm.study.education.length){
        ApplicationService
          .editEducation(vm.study)
          .then(function (res) {
            toaster.pop('success','已保存学习经历');
            console.log(vm.add);
            $state.go('admin.jx.application.navigation.step.other');
          })
      }else if(!vm.artitle){
        toaster.pop('error','请完善论文');
      }else if(!vm.educationExp || !vm.study.education.length){
        toaster.pop('error','请完善学习经历');
      }
      //angular.extend(vm.add.papers,vm.add.papers.data);
      //angular.extend(vm.add.education,vm.add.education.data);



    }

  }
})();
