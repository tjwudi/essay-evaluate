'use strict';

/**
 * @ngdoc function
 * @name evaluateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
.controller('MainCtrl', function ($scope, $http) {
  $scope.data = [];
  $scope.cursor = -1;
  $scope.loadNext = function () {
    var len = $scope.data.length;
    while ($scope.cursor < len - 1) {
      $scope.cursor += 1;
      if ($scope.isFeedbackMode && $scope.data[$scope.cursor].label !== 1 &&
          $scope.data[$scope.cursor].label !== 2) {
        continue;
      }
      $scope.currentData = $scope.data[$scope.cursor];
      return;
    }
    alert('Finished');
  };
  $scope.isFeedbackMode = false;
  $scope.$watch('checkFeedback', function (newVal) {
    if (newVal === undefined) {
      return;
    }
    console.log('Feedback mode: ' + newVal);
    $scope.isFeedbackMode = !!newVal;
    $scope.cursor = -1;
    $scope.loadNext();
  });
  $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    readOnly: 'nocursor',
    mode: 'js'
  };
  // Load data from server
  $http({
    method: 'GET',
    url: '/data/data.json'
  }).then(function (res) {
    $scope.data = res.data;
    $scope.cursor = -1;
    $scope.loadNext();
  }, function () {
    console.log('Failed to load data');
  });
});
