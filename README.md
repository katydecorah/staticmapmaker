# Static Map Maker [![Build Status](https://travis-ci.org/katydecorah/staticmapmaker.svg?)](https://travis-ci.org/katydecorah/staticmapmaker)

This app helps you build a static map URL.

- [Bing Static Maps](https://msdn.microsoft.com/en-us/library/ff701724.aspx)
- [Google Static Maps](https://developers.google.com/maps/documentation/staticmaps/)
- [Mapbox Static Maps](https://docs.mapbox.com/help/how-mapbox-works/static-maps/)
- [MapQuest Static Maps](https://www.mapquestapi.com/staticmap/)

Built with Jekyll and Angular.

## Notes

Each API has the following assets (using Mapbox as an example):

- [\_posts/0000-01-01-mapbox.md](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/_posts/0000-01-01-mapbox.md)
  - A file in `_posts/`
  - The file includes, the API's name in normal case, and a link to the API's documentation.
  - Place extra HTML for controls in the body of the page.

```yaml
---
title: Mapbox
link: https://docs.mapbox.com/api/maps/#static-images
controls:
# metadata for each input
---
```

- [js/mapbox.js](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/js/mapbox.js)
  - Settings for the controls and API call
- [\_includes/map/mapbox.html](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/_includes/map/mapbox.html)
  - Builds in the API call
- [img/mapbox.png](https://github.com/katydecorah/staticmapmaker/blob/gh-pages/img/mapbox.png)
  - 400x400 PNG of the map
