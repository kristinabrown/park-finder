$(document).ready(function() {
  
  
  L.mapbox.accessToken = $('#map-data').data('token');
  
  // var map = L.mapbox.map('map', 'kristinabrown.241388a6', { zoomControl: false })
  // .setView([39.739, -104.990], 12);
  // 
  
  var map = L.mapbox.map('map', 'kristinabrown.241388a6');
  map.setView([39.750081, -104.999703], 13);
  
  var myLayer = L.mapbox.featureLayer().addTo(map);
  
  if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
  } else {
      geolocate.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          map.locate();
      };
  }

  // Once we've got a position, zoom and center the map
  // on it, and add a single marker.
  map.on('locationfound', function(e) {
      map.fitBounds(e.bounds);

      myLayer.setGeoJSON({
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [e.latlng.lng, e.latlng.lat]
          },
          properties: {
              'title': 'Here I am!',
              'marker-color': '#ff8888',
              'marker-symbol': 'star'
          }
      });

  });

  // If the user chooses not to allow their location
  // to be shared, display an error message.
  map.on('locationerror', function() {
      geolocate.innerHTML = 'Position could not be found';
  });
      
});