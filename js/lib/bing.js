myApp.controller('bingController', ['$scope', function($scope) {

  $scope.base = {
    location: "Albany, NY",
    zoom: 13,
    minZoom: 0,
    maxZoom: 21,
    width: 600,
    height: 300,
    mapType: "Road",
    format: "png",
    showTraffic: false
  };

$scope.mapTypes = [
{"value": "Aerial","text": "Aerial"},
{"value": "AerialWithLabels","text": "Aerial with a road overlay"},
{"value": "Road","text": "Roads without additional imagery"},
{"value": "OrdnanceSurvey","text": "Ordnance Survey imagery (London area only)"},
{"value": "CollinsBart","text": "Collins Bart imagery (London area only)"}
 ];
$scope.formats = [ "png", "gif", "jpeg" ];

}]);
