myApp.controller('cartodbController', ['$scope', function($scope) {

  $scope.geojson = undefined;

  $scope.base = {
    location: "42.6564,-73.7638",
    zoom: 13,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 8192,
    format: "png",
    retina: true,
    token: null,
    named: null,
    user: null
  };

  $scope.formats = [ "png","jpg"];

  $scope.showPlaceholder = function() {
    if ($scope.base.user && ($scope.base.token || $scope.base.named)) {
      return false;
    } else {
      return true;
    }
  };

  $scope.buildMapURL = function() {

    var map = 'https://cartocdn-ashbu.global.ssl.fastly.net/';

    if ($scope.base.user) {
      map += $scope.base.user;
    } else {
      map += 'USER';
    }

    map += '/api/v1/map/static/';

    if ($scope.base.token) {

      map += 'center/';

      map += $scope.base.token;

      map += '/' + $scope.base.zoom;

      map += '/' + $scope.base.location.replace(',','/');

    } else if ($scope.base.named) {
      map += 'named/' + $scope.base.named;
    } else {
      map += 'center/';

      map += 'TOKEN';

      map += '/' + $scope.base.zoom;

      map += '/' + $scope.base.location.replace(',','/');
    }

    map += '/' + $scope.base.width;

    map += '/' + $scope.base.height;

    map += '.' + $scope.base.format;

    return map;

  };

}]);
