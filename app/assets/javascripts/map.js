$(document).ready(function() {

  L.mapbox.accessToken = $('#map-data').data('token');
  
  var geolocate = document.getElementById('geolocate');
  
  var map = L.mapbox.map('map', 'kristinabrown.mff7k9oa');
  
  var geocoderControl = L.mapbox.geocoderControl('mapbox.places');
  geocoderControl.addTo(map);

  var myLayer = L.mapbox.featureLayer().addTo(map);
  
  var $parksDiv = $("#parks");
  
  $("#geolocate").click(function(){
    $("#spinner").toggleClass("hidden");  
  })
  
  if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
  } else {
      geolocate.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          map.locate();
      };
  }

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
          "marker-size": "medium",
          "marker-symbol": "star"
        }
      });
      
      $parksDiv.empty();
      $parksDiv.append(parks.map(function(park){
        return $("<div class='row park-row'><div class='hidden'>" + park.table.id + " </div><div class='col s2 m3'>" +
                  "<div class='card blue darken-2'>" +
                  "<div class='card-content center'>" + 
                  "<span class='card-title yellow-text text-lighten-3'>" +
                  park.table.name + "</span><br><img src='" + park.table.image + "' alt='park image' height='70' width='80'> <p class='white-text'>" + park.table.address +
                  "</p><div class='card-action'><img src='" + park.table.rating_url + "' alt='rating image' width='65'> <a class='cyan-text text-lighten-4 center' href='" +
                  park.table.yelp_url + "' target='_blank'>View on Yelp</a> </div> </div></div> </div>");
      }));
      

   });
    $("#parks").addClass("parks")
    $("#map").removeClass("big-map").addClass("small-map");
      var parkLayer = map.featureLayer.setGeoJSON(myParks);
      map.fitBounds(parkLayer.getBounds());
      
    $(".park-row").mouseenter(function(){
      var all = $(this).text();
      var index = all.slice(0, 2).trim();
      var park = myParks[index]
      park.properties['marker-color'] = "#FFFF00";
      park.properties['marker-size']  = 'large';
      map.featureLayer.setGeoJSON(myParks);
    });
    
    $(".park-row").mouseleave(function(){
      var all = $(this).text();
      var index = all.slice(0, 2).trim();
      var park = myParks[index]
      park.properties['marker-color'] = "#47ABED";
      park.properties['marker-size']  = 'medium';
      map.featureLayer.setGeoJSON(myParks);
    });
  
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
  
  
  map.on('locationerror', function() {
      geolocate.innerHTML = 'Position could not be found';
  });
  
  geocoderControl.on('found', function(res) {
    $("#spinner").toggleClass("hidden");
    
    var lon = JSON.parse(JSON.stringify(res.results.features[0])).geometry.coordinates[0]
    var lat = JSON.parse(JSON.stringify(res.results.features[0])).geometry.coordinates[1]

    $.post("/parks", { lat: lat, long: lon }).then(function(parks){

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
          "marker-size": "medium",
          "marker-symbol": "star"
        }
      });
      
      $parksDiv.empty();
      $parksDiv.append(parks.map(function(park){
        return $("<div class='row park-row'><div class='hidden'>" + park.table.id + " </div><div class='col s2 m3'>" +
                  "<div class='card blue darken-2'>" +
                  "<div class='card-content center'>" + 
                  "<span class='card-title yellow-text text-lighten-3'>" +
                  park.table.name + "</span><br><img src='" + park.table.image + "' alt='park image' height='70' width='80'> <p class='white-text'>" + park.table.address +
                  "</p><div class='card-action'><img src='" + park.table.rating_url + "' alt='rating image' width='65'> <a class='cyan-text text-lighten-4 center' href='" +
                  park.table.yelp_url + "' target='_blank'>View on Yelp</a> </div> </div></div> </div>");
      }));
        
   });
     $("#parks").addClass("parks")
     $("#map").removeClass("big-map").addClass("small-map");
      var parkLayer = map.featureLayer.setGeoJSON(myParks);
      map.fitBounds(parkLayer.getBounds());
      
      $(".park-row").mouseenter(function(){
        var all = $(this).text();
        var index = all.slice(0, 2).trim();
        var park = myParks[index]
        park.properties['marker-color'] = "#FFFF00";
        park.properties['marker-size']  = 'large';
        map.featureLayer.setGeoJSON(myParks);
      });
      
      $(".park-row").mouseleave(function(){
        var all = $(this).text();
        var index = all.slice(0, 2).trim();
        var park = myParks[index]
        park.properties['marker-color'] = "#47ABED";
        park.properties['marker-size']  = 'medium';
        map.featureLayer.setGeoJSON(myParks);
      });
    
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