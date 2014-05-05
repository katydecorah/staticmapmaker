var myApp = angular.module('myApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var controller = function($scope) {
  $scope.e = {
    location:"Albany, NY",
    locationAbout:"Try an address, a city, a place, or even latitude and longitude.",
    API:"",
    APIAbout:"You don't always need an API Key for Static Maps, but it's easy to acquire one. Without a key you might receive an error image instead of a map. Follow the link to the API Console.",
    zoom:13,
    minZoom:0,
    maxZoom:22,
    scaleAbout:"Scale will double the stated height and width. This is good for when you need a width or height larger than 640px.",
    width:600,
    height:300,
    maxSize:640,
    sizeAbout:"Max is 640px or 1280px when scale 2x.",
    markerColor: "red",
    mapType: "roadmap",
    format:"png",
    markerSize:"mid",
    gimmeAbout:"Treat this like a regular image. Pop it into an img tag or use as a background-image."
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
  "tiny",
  "small",
  "mid"
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
  "png32",
  "gif",
  "jpg",
  "jpg-baseline"
  ];

};
