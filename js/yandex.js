angular.module('staticMapMaker').controller('YandexController', function($scope) {
	var vm = $scope;

	vm.base = {
		location: '-73.7638,42.6564',
		zoom: 13,
		minZoom: 0,
		maxZoom: 17,
		width: 600,
		height: 300,
		maxWidth: 650,
		maxHeight: 450,
		mapType: 'map',
		autoCenter: false,
		API: null,
		language: 'en-US',
		style: 'pm',
		color: 'gr',
		size: 'm',
		label: null
	};

	vm.languages = [
		{'value':'tr-TR','text':'Turkish'},
		{'value':'ru-RU','text':'Russian'},
		{'value':'en-US','text':'English'}
	];

	vm.markerSizes = [
		{ 'value': 'tiny', 'text': 'small' },
		{ 'value': 'small', 'text': 'medium' },
		{ 'value': 'mid', 'text': 'large' }
	];
	vm.mapTypes = [
		{ 'value': 'map', 'text': 'map' },
		{ 'value': 'sat', 'text': 'satellite' },
		{ 'value': 'skl', 'text': 'geo' },
		{ 'value': 'trf', 'text': 'traffic' }
	];

	vm.layers=['map'];
	vm.toggleLayers = function toggleLayers(employeeName) {
		var idx = vm.layers.indexOf(employeeName);
		if (idx > -1) {
			vm.layers.splice(idx, 1);
		} else {
			vm.layers.push(employeeName);
		}
	};


	vm.styles = [
		{ 'value':'pm','text':'Placemarker'},
		{ 'value':'pm2','text':'Placemarker 2'},
		{ 'value':'flag','text':'Flag'},
		{ 'value':'vk','text':'VK'}
	];

	vm.colors = [
		{'type':'pm','value':'wt','text':'white'},
		{'type':'pm','value':'do','text':'dark orange'},
		{'type':'pm','value':'db','text':'dark blue'},
		{'type':'pm','value':'bl','text':'blue'},
		{'type':'pm','value':'gn','text':'green'},
		{'type':'pm','value':'gr','text':'grey'},
		{'type':'pm','value':'lb','text':'light blue'},
		{'type':'pm','value':'nt','text':'night'},
		{'type':'pm','value':'or','text':'orange'},
		{'type':'pm','value':'pn','text':'pink'},
		{'type':'pm','value':'rd','text':'red'},
		{'type':'pm','value':'vv','text':'violet'},
		{'type':'pm','value':'yw','text':'yellow'},
		{'type':'pm2','value':'wt','text':'white'},
		{'type':'pm2','value':'do','text':'dark orange'},
		{'type':'pm2','value':'db','text':'dark blue'},
		{'type':'pm2','value':'bl','text':'blue'},
		{'type':'pm2','value':'gn','text':'green'},
		{'type':'pm2','value':'dg','text':'dark green'},
		{'type':'pm2','value':'gr','text':'grey'},
		{'type':'pm2','value':'lb','text':'light blue'},
		{'type':'pm2','value':'nt','text':'night'},
		{'type':'pm2','value':'or','text':'orange'},
		{'type':'pm2','value':'pn','text':'pink'},
		{'type':'pm2','value':'rd','text':'red'},
		{'type':'pm2','value':'vv','text':'violet'},
		{'type':'pm2','value':'yw','text':'yellow'},
		{'type':'pm2','value':'a','text':'A'},
		{'type':'pm2','value':'b','text':'B'},
		{'type':'pm2','value':'org','text':'blue'},
		{'type':'pm2','value':'dir','text':'violet'},
		{'type':'pm2','value':'blyw','text':'blue with yellow dot'},
		{'type':'flag','value':'flag','text':'flag'},
		{'type':'vk','value':'bk','text':'black'},
		{'type':'vk','value':'gr','text':'grey'}
	];

	vm.sizes = [
		{'type':'pm','value':'s','text':'small'},
		{'type':'pm','value':'m','text':'medium'},
		{'type':'pm','value':'l','text':'large'},
		{'type':'pm2','value':'m','text':'medium'},
		{'type':'pm2','value':'l','text':'large'},
		{'type':'vk','value':'m','text':'medium'}
	];



	//http://jsfiddle.net/slav123/75m7e/3/
	vm.markers = {
		pushpins: []
	};

	vm.addPushpin = function() {
		vm.markers.pushpins.push({
			style: vm.base.style,
			coordinates: vm.base.location,
			color: vm.base.color,
			size: vm.base.size,
			label: vm.base.label
		});
	},

	vm.removePushpin = function(index) {
		vm.markers.pushpins.splice(index, 1);
	},

	vm.pushpinSet = function() {
		var total='';

		angular.forEach(vm.markers.pushpins, function(pushpin,i) {

			if (i === 0) {
				total += '&pt=';
			} else {
				total += '~';
			}

			if (pushpin.coordinates) {


				if (pushpin.style == 'flag') {

					total += pushpin.coordinates +','+ pushpin.style;

				} else if (pushpin.style == 'vk') {

					total += pushpin.coordinates +','+ pushpin.style + pushpin.color + pushpin.size;

				} else {

					total += pushpin.coordinates +','+ pushpin.style + pushpin.color + pushpin.size;

					if (pushpin.label) {
						total += pushpin.label;
					}
				}
			}
		});

		return total;
	};
});