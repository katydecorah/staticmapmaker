angular.module('staticMapMaker').controller('MapboxController', function($scope) {
  var vm = $scope;

  vm.geojson = undefined;

  vm.base = {
    location: '-73.7638,42.6564',
    zoom: 13,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 1280,
    auto: false,
    format: '@2x.png',
    retina: true,
    API: null,
    mapID: null,
    mapboxID: 'mapbox/outdoors-v11',
    bearing: 0,
    pitch: 0,
    attribution: true,
    logo: true,
    geojson: null
  };
  vm.markerSizes = [
    { 'value': 's', 'text': 'small' },
    { 'value': 'm', 'text': 'medium' },
    { 'value': 'l', 'text': 'large' }
  ];
  vm.labels = [
    'airfield',
    'airport',
    'alcohol-shop',
    'america-football',
    'art-gallery',
    'bakery',
    'bank',
    'bar',
    'baseball',
    'basketball',
    'beer',
    'bicycle',
    'building',
    'bus',
    'cafe',
    'camera',
    'campsite',
    'car',
    'cemetery',
    'chemist',
    'cinema',
    'circle-stroked',
    'circle',
    'city',
    'clothing-store',
    'college',
    'commercial',
    'cricket',
    'cross',
    'dam',
    'danger',
    'disability',
    'dog-park',
    'embassy',
    'emergency-telephone',
    'entrance',
    'farm',
    'fast-food',
    'ferry',
    'fire-station',
    'fuel',
    'garden',
    'golf',
    'grocery',
    'hairdresser',
    'harbor',
    'heart',
    'heliport',
    'hospital',
    'industrial',
    'land-use',
    'laundry',
    'library',
    'lighthouse',
    'lodging',
    'logging',
    'london-underground',
    'marker-stroked',
    'marker',
    'minefield',
    'mobilephone',
    'monument',
    'museum',
    'music',
    'oil-well',
    'park2',
    'park',
    'parking-garage',
    'parking',
    'pharmacy',
    'pitch',
    'place-of-worship',
    'playground',
    'police',
    'polling-place',
    'post',
    'prison',
    'rail-above',
    'rail-light',
    'rail-metro',
    'rail-underground',
    'rail',
    'religious-christian',
    'religious-jewish',
    'religious-muslim',
    'restaurant',
    'roadblock',
    'rocket',
    'school',
    'scooter',
    'shop',
    'skiing',
    'slaughterhouse',
    'soccer',
    'square-stroked',
    'square',
    'star-stroked',
    'star',
    'suitcase',
    'swimming',
    'telephone',
    'tennis',
    'theatre',
    'toilets',
    'town-hall',
    'town',
    'triangle-stroked',
    'triangle',
    'village',
    'warehouse',
    'waste-basket',
    'water',
    'wetland',
    'zoo',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  ];

  vm.formats = ['png', 'png32', 'png64', 'png128', 'png256', 'jpg70', 'jpg80', 'jpg90', '@2x.png'];

  vm.mapboxids = [
    { 'value': 'mapbox/streets-v11', 'text' : 'Streets' },
    { 'value': 'mapbox/light-v10', 'text' : 'Light' },
    { 'value': 'mapbox/dark-v10', 'text' : 'Dark' },
    { 'value': 'mapbox/satellite-v9', 'text' : 'Satellite' },
    { 'value': 'mapbox/satellite-streets-v11', 'text' : 'Satellite streets' },
    { 'value': 'mapbox/outdoors-v11', 'text' : 'Outdoors' }
  ];

  vm.buildMapURL = function() {

    var map = 'https://api.mapbox.com/styles/v1/';


    if (vm.base.mapID) {
      map += vm.base.mapID;
      vm.base.mapboxID = '';
    } else {
      map += vm.base.mapboxID;
    }

   map +=  '/static';

    if (vm.geojson) map += '/geojson('+ encodeURIComponent(vm.geojson).replace(/\s/g, '')+')';

    map += vm.pushpinSet() + '/';

    if (vm.base.auto === true) map += 'auto';
    else map +=  vm.base.location.replace(/\s/g, '') +','+ vm.base.zoom;

    if (!vm.base.auto) {
      if (vm.base.bearing) map += ',' + vm.base.bearing;
      else map += ',0';
    }

    if (vm.base.pitch && !vm.base.auto) map += ',' + vm.base.pitch;

    map += '/' + vm.base.width +'x'+ vm.base.height;



    if (vm.base.retina) {
      map += '@2x';
      vm.base.maxSize = 640;
    } else {
      vm.base.maxSize = 1280;
    }



    map +='?access_token=';

    if (vm.base.API) map += vm.base.API;
    else map += 'YOUR-API-KEY-HERE';

    if (!vm.base.attribution) map += '&attribution=' + vm.base.attribution;

    if (!vm.base.logo) map += '&logo=' + vm.base.logo;
    return map;
  };

  //http://jsfiddle.net/slav123/75m7e/3/
  vm.markers = {
    pushpins: []
  };

  vm.addPushpin = function() {
    vm.markers.pushpins.push({
      markerSize: 's',
      coordinates: vm.base.location,
      markerLabel: 'heart',
      markerColor: '285A98',
      markerCustom: ''
    });
  },

  vm.removePushpin = function(index) {
    vm.markers.pushpins.splice(index, 1);
  },

  vm.pushpinSet = function() {
    var total = '';
    angular.forEach(vm.markers.pushpins, function(marker,i) {
      if (i === 0) {
        total += '/';
      } else {
        total += ',';
      }
      if (marker.coordinates) {
        if (marker.markerCustom) {
          total +='url-'+encodeURIComponent(marker.markerCustom)+'('+marker.coordinates+')';
        } else {
          total += 'pin-'+ marker.markerSize + '-'+ marker.markerLabel + '+' + marker.markerColor.split('#').join('') + '('+marker.coordinates +')';
        }
      }

    });
    return total;
  };

});
