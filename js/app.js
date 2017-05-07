angular.module('staticMapMaker', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

angular.module('staticMapMaker').filter('nospace', function() {
  return function(value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
});

angular.module('staticMapMaker').filter('escape', function($window) {
  return $window.escape;
});

angular.module('staticMapMaker').filter('encode', function($window) {
  return $window.encodeURIComponent;
});

angular.module('staticMapMaker').filter('strip', function() {
  return function(value) {
    return (!value) ? '' : value.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,'');
  };
});

angular.module('staticMapMaker').filter('isNumber', function() {
  return function isInt(n) {
    return n % 1 === 0;
  };
});

//http://stackoverflow.com/a/16388643
angular.module('staticMapMaker').directive('capitalize', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel',
    link : function(scope, element, attrs, modelCtrl) {
      var capitalize = function(inputValue) {
        if (inputValue) {
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

angular.module('staticMapMaker').directive('myAdSense', function() {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    template: '<div ng-transclude></div>',
    link: function() {}
  };
});
