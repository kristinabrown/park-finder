$(document).ready(function() {
  
  
  L.mapbox.accessToken = $('#map-data').data('token');
  
  var geolocate = document.getElementById('geolocate');
  
  
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
  
  var $parksDiv = $("#parks");

  // Once we've got a position, zoom and center the map
  // on it, and add a single marker.
  
    $("#geolocate").click(function(){
      $("#spinner").toggleClass("hidden");  
    })

  map.on('locationfound', function(e) {
    $.post("/parks", { lat: e.latitude, long: e.longitude }).then(function(parks){
      // var geojson = $.parseJSON(parks);
    $("#spinner").toggleClass("hidden");
      var myParks = [];
      parks.map(function(park) {
        myParks.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [park.table.longitude,park.table.latitude]
        },
        properties: {
          "title": park.table.name,
          "description": park.table.address,
          "marker-color": "#47ABED",
          "marker-size": "large",
          "marker-symbol": "star"
        }
      });
        //  return $("<h1>" + park.table.name + "</h1>");
   });

      var parkLayer = map.featureLayer.setGeoJSON(myParks);
      map.fitBounds(parkLayer.getBounds());
     });

  myLayer.setGeoJSON({
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [e.latlng.lng, e.latlng.lat]
      },
      properties: {
          'title': 'You Are Here!',
          'marker-color': '#ff8888',
          'marker-symbol': 'star'
      }
  });
  geolocate.parentNode.removeChild(geolocate);
  
  });
  

  // If the user chooses not to allow their location
  // to be shared, display an error message.
  map.on('locationerror', function() {
      geolocate.innerHTML = 'Position could not be found';
  });
      
});