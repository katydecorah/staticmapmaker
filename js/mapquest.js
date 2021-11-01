angular
  .module("staticMapMaker")
  .controller("MapquestController", function ($scope) {
    var vm = $scope;

    vm.base = {
      location: "Albany, NY",
      API: "",
      zoom: 13,
      minZoom: 1,
      maxZoom: 18,
      width: 600,
      height: 300,
      maxSize: 3840,
      showMarker: false,
      markerColor: "blue",
      mapType: "map",
      format: "png",
      autoCenter: false,
      scaleBar: false,
      showTraffic: false,
      traffic: "flow",
      scalebarPos: "top",
    };
    vm.positions = ["top", "bottom"];

    vm.traffics = [
      { value: "flow", text: "flowing" },
      { value: "con", text: "construction" },
      { value: "inc", text: "incidents" },
    ];
    vm.colors = [
      "blue",
      "green",
      "orange",
      "purple",
      "white",
      "yellow",
      "blue_1",
      "blue_2",
      "blue_3",
      "blue_4",
      "bluegreen_1",
      "bluegreen_2",
      "bluegreen_3",
      "green_1",
      "green_2",
      "green_3",
      "green_4",
      "orange_1",
      "orange_2",
      "orange_3",
      "pink_1",
      "pink_2",
      "pink_3",
      "purple_1",
      "purple_2",
      "purple_3",
      "purple_4",
      "red_1",
      "red_2",
      "white_1",
      "yellow_1",
      "yellow_2",
      "yellow_3",
    ];

    vm.mapTypes = [
      { value: "map", text: "map" },
      { value: "sat", text: "satellite" },
      { value: "hyb", text: "hybrid" },
    ];

    vm.formats = ["png", "gif", "jpg", "jpeg"];
  });
