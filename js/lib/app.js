var myApp = angular.module('staticMapMaker', [], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

myApp.controller('googleController', ['$scope', function($scope) {

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
    autoCenter: false
  };
  $scope.colors = [ "black", "brown", "green", "purple", "yellow", "blue", "gray", "orange", "red", "white" ];
  $scope.markerSizes = [
{ "value": "tiny", "text": "small" },
{ "value": "small", "text": "medium" },
{ "value": "mid", "text": "large" }
];
$scope.mapTypes = [ "roadmap", "terrain", "satellite", "hybrid" ];
$scope.formats = [ "png", "gif", "jpg" ];
}]);

myApp.controller('mapboxController', ['$scope', function($scope) {
  $scope.base = {
    location: "-73.7638,42.6564",
    zoom: 14,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 1280,
    auto: true,
    format: "@2x.png",
    markerSize: "s",
    API: "",
    mapID: "",
    markerColor: "285A98",
    markerLabel: "heart"
  };
  $scope.markerSizes = [
{ "value": "s", "text": "small" },
{ "value": "m", "text": "medium" },
{ "value": "l", "text": "large" }
];
$scope.labels = [ "airfield", "airport", "alcohol-shop", "america-football", "art-gallery", "bakery", "bank", "bar", "baseball", "basketball", "beer", "bicycle", "building", "bus", "cafe", "camera", "campsite", "car", "cemetery", "chemist", "cinema", "circle-stroked", "circle", "city", "clothing-store", "college", "commercial", "cricket", "cross", "dam", "danger", "disability", "dog-park", "embassy", "emergency-telephone", "entrance", "farm", "fast-food", "ferry", "fire-station", "fuel", "garden", "golf", "grocery", "hairdresser", "harbor", "heart", "heliport", "hospital", "industrial", "land-use", "laundry", "library", "lighthouse", "lodging", "logging", "london-underground", "marker-stroked", "marker", "minefield", "mobilephone", "monument", "museum", "music", "oil-well", "park2", "park", "parking-garage", "parking", "pharmacy", "pitch", "place-of-worship", "playground", "police", "polling-place", "post", "prison", "rail-above", "rail-light", "rail-metro", "rail-underground", "rail", "religious-christian", "religious-jewish", "religious-muslim", "restaurant", "roadblock", "rocket", "school", "scooter", "shop", "skiing", "slaughterhouse", "soccer", "square-stroked", "square", "star-stroked", "star", "suitcase", "swimming", "telephone", "tennis", "theatre", "toilets", "town-hall", "town", "triangle-stroked", "triangle", "village", "warehouse", "waste-basket", "water", "wetland", "zoo", "a", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
$scope.formats = [ "png", "png32", "png64", "png128", "png256", "jpg70", "jpg80", "jpg90", "@2x.png" ];
}]);

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

myApp.filter('nospace', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
});
myApp.filter('escape', function() {
  return window.escape;
});
