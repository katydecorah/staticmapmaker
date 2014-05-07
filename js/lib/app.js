var myApp = angular.module('staticMapMaker', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var controller = function($scope) {
  $scope.base = {
    location: "Albany, NY",
    zoom: 13,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 640,
    markerColor: "red",
    mapType: "roadmap",
    format: "png",
    markerSize: "mid",
  };
  $scope.colors =
  [
  "black",
  "brown",
  "green",
  "purple",
  "yellow",
  "blue",
  "gray",
  "orange",
  "red",
  "white"
  ];
  $scope.markerSizes =
  [
   { "value": "tiny", "text": "small" },
   { "value": "small", "text": "medium" },
   { "value": "mid", "text": "large" }
  ];
  $scope.mapTypes =
  [
  "roadmap",
  "terrain",
  "satellite",
  "hybrid"
  ];
  $scope.formats =
  [
  "png",
  //"png32",
  "gif",
  "jpg"
  //"jpg-baseline"
  ];

};
