/**
 * Created by yong on 16/5/6.
 */
'use strict'

angular.module('merchantApp')
.service('ApplicationService',ApplicationService);

ApplicationService.$inject = ['$http','ENDPOINT'];

function ApplicationService($http,ENDPOINT) {
  return {
    application:application,
    list:list,
    editBase:editBase,
    editWork:editWork,
    editEducation:editEducation,
    editOther:editOther,
    settings:settings,
    submit:submit,
    confirm:confirm,
    select:select,//根据课程获取申请表
    remove:remove,//取消申请
    accommodation:accommodation,//是否提供住宿
    findApplicationCourse:findApplicationCourse,//获取申请一半的申请课程ID
    enrollment:enrollment
  };
  function enrollment(id) {
    return $http({
      url:ENDPOINT + '/application/' + id + '/downloadEnrollmentIntro',
      method:'GET'
    })
  }

  function findApplicationCourse() {
    return $http({
      url:ENDPOINT + '/application/get-course-id',
      method:'GET'
    })
  }

  function accommodation() {
    return $http({
      url:ENDPOINT + '/settings/accommodation',
      method:'GET'
    })
  }
  function remove(id) {
    return $http({
      url:ENDPOINT + '/application/' + id,
      method:'DELETE'
    })
  }
  function select(id,params) {
    return $http({
      url:ENDPOINT + '/application/' + id,
      method:'GET',
      params:params
    })
  }

  function confirm(id,data) {
    return $http({
      url:ENDPOINT + '/application/' + id + '/confirm',
      method:'PUT',
      data:data

    })
  }
  function submit(id,data) {
    return $http({
      url:ENDPOINT + '/application/' + id + '/submit',
      method:'PUT',
      data:data
    })
  }
  function editWork(data) {
    return $http({
      url:ENDPOINT + '/users-info-step2',
      method:'PUT',
      data:data
    })
  }

  function editEducation(data) {
    return $http({
      url:ENDPOINT + '/users-info-step3',
      method:'PUT',
      data:data
    })
  }
  function editOther(data) {
    return $http({
      url:ENDPOINT + '/users-info-step4',
      method:'PUT',
      data:data
    })
  }

  function settings() {
    return $http({
      url:ENDPOINT +'/settings',
      method:'GET'
    })
  }

  function editBase(data) {
    return $http({
      url:ENDPOINT + '/users-info-step1',
      method:'PUT',
      data:data
    })
  }

  function list(params) {
    return $http({
      url:ENDPOINT + '/users',
      method:'GET',
      params:params
    })
  }

  function application(params) {
    return $http({
      url:ENDPOINT + '/application',
      method:'GET',
      params:params
    })
  }
}
