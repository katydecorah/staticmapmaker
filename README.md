Static Map Maker [![Build Status](https://travis-ci.org/katydecorah/staticmapmaker.svg?)](https://travis-ci.org/katydecorah/staticmapmaker)
==============

This app helps you build a static map URL.

* [Bing Static Maps](https://msdn.microsoft.com/en-us/library/ff701724.aspx)
* [Google Static Maps](https://developers.google.com/maps/documentation/staticmaps/)
* [Mapbox Static Maps](https://www.mapbox.com/developers/api/static/)
* [MapQuest Static Maps](http://www.mapquestapi.com/staticmap/)


Built with Jekyll and Angular. 

Check out the Polish version: http://staticmapmaker.pl/

## Notes

Each API has the following assets (using Mapbox as an example):

* [mapbox/index.html](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/mapbox/index.html)
  - Generates the page
	- Page includes the `page` layout, the API's name in normal case, and a link to the API's documentation:
	```
	---
	layout: page
	title: Mapbox
	link: https://www.mapbox.com/developers/api/static/
	---
	```
* [_includes/controls/mapbox.html](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/_includes/controls/mapbox.html)
  - HTML for the API's controls
* [js/mapbox.js](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/js/mapbox.js)
  - Settings for the controls and API call
* [_includes/map/mapbox.html](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/_includes/map/mapbox.html)
  - Builds in the API call
* [img/mapbox.png](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/img/mapbox.png)
  - 400x400 PNG of the map
