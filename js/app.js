var myApp = angular.module('staticMapMaker', [], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

myApp.filter('nospace', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
});
myApp.filter('escape', function() {
  return window.escape;
});

myApp.filter('encode', function() {
  return window.encodeURIComponent;
});

myApp.filter('strip', function() {
  return function (value) {
    return (!value) ? '' : value.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,'');
  };
});

myApp.filter('isNumber', function() {
  return function isInt(n) {
    return n % 1 === 0;
  };
});

//http://stackoverflow.com/a/16388643
myApp.directive('capitalize', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel',
    link : function(scope, element, attrs, modelCtrl) {
      var capitalize = function(inputValue) {
        if(inputValue) {
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
      };
      modelCtrl.$parsers.push(capitalize);
      capitalize(scope[attrs.ngModel]); // capitalize initial value
    }
  };
});

myApp.directive('myAdSense', function() {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    template: '<div ng-transclude></div>',
    link: function ($scope, element, attrs) {}
  };
});
