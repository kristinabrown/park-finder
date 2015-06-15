$(document).ready(function() {
  
  
  L.mapbox.accessToken = $('#map-data').data('token');
  
  var geolocate = document.getElementById('geolocate');
  
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
  
  var $parksDiv = $("#parks");
  // map.featureLayer.on('ready', function(e) {
  //   getEvents(map);
  //   
  //   $.post("/parks", { lat: e.latitude, long: e.longitude }).then(function(parks){
      // $parksDiv.empty();
      //     $parksDiv.append(parks.map(function(park) {
      //       return $("<h1>" + park.table.name + "</h1>");
      //     }));
        // var geojson = $.parseJSON(parks);
//         debugger;
//         map.featureLayer.setGeoJSON({
//             type: "FeatureCollection",
//             features: geojson
//           });
//           addEventPopups(map);
//     });
// });
  // Once we've got a position, zoom and center the map
  // on it, and add a single marker.
  
  

  map.on('locationfound', function(e) {
    $.post("/parks", { lat: e.latitude, long: e.longitude }).then(function(parks){
      // var geojson = $.parseJSON(parks);
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
      map.featureLayer.setGeoJSON(myParks);
    //     addEventPopups(map);
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
  
  
  map.fitBounds(featureLayer.getBounds());

  // If the user chooses not to allow their location
  // to be shared, display an error message.
  map.on('locationerror', function() {
      geolocate.innerHTML = 'Position could not be found';
  });
      
});