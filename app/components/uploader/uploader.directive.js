(function() {
    'use strict';

    angular
        .module('merchantApp')
        .directive('uploader', directive);

    /**
     * 文件上传Directive
     * 使用方式：
     * ``` html
     * 	<uploader files="vm.course.attachments"></uploader>
     * ```
     * @return {object} Directive
     */
    function directive() {
        var directive = {
            restrict: 'E',
            templateUrl: 'components/uploader/uploader.directive.html',
            scope: {
                'files': '=files'
            },
            controller: Controller
        };

        return directive;
    }

    Controller.$inject = ['$scope', '$http', 'FileUploader', 'ENDPOINT'];

    /* @ngInject */
    function Controller($scope, $http, FileUploader, ENDPOINT) {
        $scope.uploader = new FileUploader({
            url: ENDPOINT + '/files',
            method: 'POST',
            autoUpload: true,
            removeAfterUpload: true,
            onSuccessItem: function (item, response, status, headers) {
                $scope.files.push(response.data.file);
            }
        });

        // 删除附件
        $scope.removeAttachment = function (a) {
            var index = $scope.files.indexOf(a);
            if (index > -1) {
                $scope.files.splice(index, 1);
            }
        };
    }
})();
