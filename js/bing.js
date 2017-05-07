angular.module('staticMapMaker').controller('BingController', function($scope) {
  var vm = $scope;

  vm.base = {
    location: '42.6564,-73.7638',
    zoom: 13,
    minZoom: 0,
    maxZoom: 21,
    width: 600,
    height: 300,
    mapType: 'Road',
    format: 'png',
    showTraffic: false
  };

  vm.mapTypes = [
    {'value': 'Aerial','text': 'Aerial'},
    {'value': 'AerialWithLabels','text': 'Aerial with a road overlay'},
    {'value': 'Road','text': 'Roads without additional imagery'},
    {'value': 'OrdnanceSurvey','text': 'Ordnance Survey imagery (London area only)'},
    {'value': 'CollinsBart','text': 'Collins Bart imagery (London area only)'}
  ];
  vm.formats = [ 'png', 'gif', 'jpeg' ];


  //http://jsfiddle.net/slav123/75m7e/3/
  vm.markers = {
    pushpins: []
  };

  vm.addPushpin = function() {
    vm.markers.pushpins.push({
      style: 64,
      coordinates: vm.base.location,
      label: 'Hi'
    });
  },

  vm.removePushpin = function(index) {
    vm.markers.pushpins.splice(index, 1);
  },

  vm.pushpinSet = function() {
    var total = '';
    angular.forEach(vm.markers.pushpins, function(pushpin) {
      if (pushpin.coordinates) {
        total += '&pushpin='+pushpin.coordinates +';'+ pushpin.style +';'+ pushpin.label.split(' ').join('%20');
      }
    });

    return total;
  };

});
