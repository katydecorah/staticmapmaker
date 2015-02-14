myApp.controller('googleController', ['$scope', function($scope) {

  $scope.base = {
    location: "Albany, NY",
    zoom: 13,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 640,
    mapType: "roadmap",
    format: "png",
    autoCenter: false
  };
  $scope.markerSizes = [
    { "value": "tiny", "text": "small" },
    { "value": "small", "text": "medium" },
    { "value": "mid", "text": "large" }
  ];
  $scope.mapTypes = [ "roadmap", "terrain", "satellite", "hybrid" ];
  $scope.markerLabels = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  $scope.formats = [ "png", "gif", "jpg" ];

  //http://jsfiddle.net/slav123/75m7e/3/
  $scope.markers = {
    pushpins: []
  };

  $scope.addPushpin = function() {
    $scope.markers.pushpins.push({
      markerSize: 'mid',
      coordinates: $scope.base.location,
      markerLabel: '1',
      markerColor: 'red',
      markerCustom: '',
      markerShadow: true
    });
  },

  $scope.removePushpin = function(index) {
    $scope.markers.pushpins.splice(index, 1);
  },

  $scope.pushpinSet = function() {
    var total = '';
    angular.forEach($scope.markers.pushpins, function(marker,i) {
      if (marker.coordinates) {
        if (marker.markerCustom) {

          total += '&markers=icon:'+ marker.markerCustom + '%7Cshadow:'+ marker.markerShadow + '%7C' + marker.coordinates.split(' ').join('+');

        } else {
          total += '&markers=size:'+ marker.markerSize + '%7Ccolor:'+ marker.markerColor.split('#').join('0x') + '%7Clabel:' + marker.markerLabel + '%7C' + marker.coordinates.split(' ').join('+');
        }
      }

    })
    return total;
  }
}]);
