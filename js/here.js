angular.module('staticMapMaker').controller('HereController', function($scope) {
  var vm = $scope;

  vm.base = {
    location: 'Albany,NY',
    zoom: 13,
    minZoom: 0,
    maxZoom: 22,
    width: 600,
    height: 300,
    maxSize: 1280,
    auto: false,
    u: null,
    distances: 'k',
    API: null,
    mapID: null,
    code_id: null,
    style: 'alps',
    format: 0,
    i: false,
    nodot: false,
    language: null,
    rotation: 0
  };


  vm.formats = [
    {'value': 0, 'text': 'PNG' },
    {'value': 1, 'text': 'JPEG' },
    {'value': 2, 'text': 'GIF' },
    {'value': 3, 'text': 'BMP' },
    {'value': 4, 'text': 'PNG8' },
    {'value': 5, 'text': 'SVG (only for companylogo)' }
  ];

  vm.distances = [
    { 'value': 'd', 'text': 'decimeters' },
    { 'value': 'h', 'text': 'hectometers' },
    { 'value': 'k', 'text': 'kilometers' },
    { 'value': 'm', 'text': 'myriad meters' },
    { 'value': 'l', 'text': 'lakh meters' },
    { 'value': 'mi', 'text': 'miles' },
    { 'value': 'ft', 'text': 'feet' }
  ];

  vm.styles = ['alps','dreamworks','flame','fleet','mini'];

  vm.languages = [
    { 'value': 'ara', 'text': 'Arabic' },
    { 'value': 'chi', 'text': 'Chinese (simplified)' },
    { 'value': 'cht', 'text': 'Chinese (traditional)' },
    { 'value': 'dut', 'text': 'Dutch' },
    { 'value': 'eng', 'text': 'English' },
    { 'value': 'fre', 'text': 'French' },
    { 'value': 'ger', 'text': 'German' },
    { 'value': 'gle', 'text': 'Gaelic' },
    { 'value': 'gre', 'text': 'Greek' },
    { 'value': 'heb', 'text': 'Hebrew' },
    { 'value': 'hin', 'text': 'Hindi' },
    { 'value': 'ind', 'text': 'Indonesian' },
    { 'value': 'ita', 'text': 'Italian' },
    { 'value': 'per', 'text': 'Persian' },
    { 'value': 'pol', 'text': 'Polish' },
    { 'value': 'por', 'text': 'Portuguese' },
    { 'value': 'rus', 'text': 'Russian' },
    { 'value': 'sin', 'text': 'Sinhalese' },
    { 'value': 'spa', 'text': 'Spanish' },
    { 'value': 'tha', 'text': 'Thai' },
    { 'value': 'tur', 'text': 'Turkish' },
    { 'value': 'ukr', 'text': 'Ukranian' },
    { 'value': 'urd', 'text': 'Urdu' },
    { 'value': 'vie', 'text': 'Vietnamese' },
    { 'value': 'wel', 'text': 'Welsh' }

  ];

});