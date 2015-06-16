$(document).ready(function() {
  
  
  L.mapbox.accessToken = $('#map-data').data('token');
  
  var geolocate = document.getElementById('geolocate');
  
  
  var map = L.mapbox.map('map', 'kristinabrown.241388a6');
  // map.setView([39.750081, -104.999703], 13);
  
  var geocoderControl = L.mapbox.geocoderControl('mapbox.places');
geocoderControl.addTo(map);
  

  
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
      
      $parksDiv.empty();
      $parksDiv.append(parks.map(function(park){
        return $("<div class='row'> <div class='col s2 m3'>" +
                  "<div class='card blue darken-2'>" +
                  "<div class='card-content white-text'>" + 
                  "<span class='card-title center'>" +
                  park.table.name + "</span> <p>" + 
                  "</p><div class='card-action'><a class='cyan-text text-lighten-4 center' href='" +
                  park.table.yelp_url + "' target='_blank'>View on Yelp</a> </div> </div></div> </div>");
      }));
      

   });
    $("#parks").addClass("parks")
    $("#map").addClass("small-map");
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
  
  
  geocoderControl.on('found', function(res) {
    $("#spinner").toggleClass("hidden");
    
    var lon = JSON.parse(JSON.stringify(res.results.features[0])).geometry.coordinates[0]
    var lat = JSON.parse(JSON.stringify(res.results.features[0])).geometry.coordinates[1]

    $.post("/parks", { lat: lat, long: lon }).then(function(parks){
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
      
      $parksDiv.empty();
      $parksDiv.append(parks.map(function(park){
        return $("<div class='row'> <div class='col s2 m3'>" +
                  "<div class='card blue darken-2'>" +
                  "<div class='card-content white-text'>" + 
                  "<span class='card-title center'>" +
                  park.table.name + "</span> <p>" + 
                  "</p><div class='card-action'><a class='cyan-text text-lighten-4 center' href='" +
                  park.table.yelp_url + "' target='_blank'>View on Yelp</a> </div> </div></div> </div>");
      }));
        
   });
     $("#parks").addClass("parks")
     $("#map").addClass("small-map");
      var parkLayer = map.featureLayer.setGeoJSON(myParks);
      map.fitBounds(parkLayer.getBounds());
     });

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lon, lat]
        },
        properties: {
            'title': 'You Are Here!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });
  });
      
});