angular.module('staticMapMaker').controller('GoogleController', function($scope) {
  var vm = $scope;

  vm.base = {
    location: 'Albany, NY',
    zoom: 13,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 640,
    mapType: 'roadmap',
    format: 'png',
    scale: 1,
    autoCenter: false,
    API: null
  };

  vm.buildMapURL = function() {

    var map = 'https://maps.googleapis.com/maps/api/staticmap?';

    if (vm.base.autoCenter === true) {
      map += 'auto';
    } else {
      map += 'center='+vm.base.location.split(' ').join('+')+'&zoom='+vm.base.zoom+'&';
    }

    map += 'scale=' + vm.base.scale;

    map += '&size='+vm.base.width +'x'+vm.base.height;

    map += '&maptype=' + vm.base.mapType;

    if (vm.base.API) {
      map += '&key='+vm.base.API;
    }

    map += '&format=' + vm.base.format;

    map += '&visual_refresh=true';

    map += vm.pushpinSet();

    return map;

  };

  vm.markerSizes = [
    { 'value': 'tiny', 'text': 'small' },
    { 'value': 'small', 'text': 'medium' },
    { 'value': 'mid', 'text': 'large' }
  ];

  vm.mapTypes = [ 'roadmap', 'terrain', 'satellite', 'hybrid' ];

  vm.markerLabels = ['default','0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  vm.formats = [ 'png', 'gif', 'jpg' ];

  //http://jsfiddle.net/slav123/75m7e/3/
  vm.markers = {
    pushpins: []
  };

  vm.addPushpin = function() {
    vm.markers.pushpins.push({
      markerSize: 'mid',
      coordinates: vm.base.location,
      markerLabel: '1',
      markerColor: '#ff0000',
      markerCustom: '',
      markerShadow: true
    });
  },

  vm.removePushpin = function(index) {
    vm.markers.pushpins.splice(index, 1);
  },

  vm.pushpinSet = function() {
    var total = '';
    angular.forEach(vm.markers.pushpins, function(marker) {
      if (marker.coordinates) {
        if (marker.markerCustom) {

          total += '&markers=icon:'+ marker.markerCustom + '%7Cshadow:'+ marker.markerShadow + '%7C' + marker.coordinates.split(' ').join('+');

        } else {
          var label = marker.markerLabel == 'default' ? '' : marker.markerLabel;

          total += '&markers=size:'+ marker.markerSize + '%7Ccolor:'+ marker.markerColor.split('#').join('0x') + '%7Clabel:' + label + '%7C' + marker.coordinates.split(' ').join('+');
        }
      }

    });
    return total;
  };
});
