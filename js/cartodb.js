angular.module('staticMapMaker').controller('CartodbController', function($scope) {
  var vm = $scope;

  vm.geojson = undefined;

  vm.base = {
    location: '42.6564,-73.7638',
    zoom: 13,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 8192,
    format: 'png',
    retina: true,
    token: null,
    named: null,
    user: null
  };

  vm.formats = ['png', 'jpg'];

  vm.showPlaceholder = function() {
    if (vm.base.user && (vm.base.token || vm.base.named)) {
      return false;
    } else {
      return true;
    }
  };

  vm.buildMapURL = function() {

    var map = 'https://cartocdn-ashbu.global.ssl.fastly.net/';

    if (vm.base.user) {
      map += vm.base.user;
    } else {
      map += 'USER';
    }

    map += '/api/v1/map/static/';

    if (vm.base.token) {

      map += 'center/';

      map += vm.base.token;

      map += '/' + vm.base.zoom;

      map += '/' + vm.base.location.replace(',','/');

    } else if (vm.base.named) {
      map += 'named/' + vm.base.named;
    } else {
      map += 'center/';

      map += 'TOKEN';

      map += '/' + vm.base.zoom;

      map += '/' + vm.base.location.replace(',','/');
    }

    map += '/' + vm.base.width;

    map += '/' + vm.base.height;

    map += '.' + vm.base.format;

    return map;

  };

});
