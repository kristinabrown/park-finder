$(document).ready(function() {

  L.mapbox.accessToken = $('#map-data').data('token');
  
  var geolocate = document.getElementById('geolocate');
  
  var map = L.mapbox.map('map', 'kristinabrown.mge331mn');
  
  var geocoderControl = L.mapbox.geocoderControl('mapbox.places');
  geocoderControl.addTo(map);

  var myLayer = L.mapbox.featureLayer().addTo(map);
  
  var $parksDiv = $("#parks");
  
  var myParks = [];
  
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
    
      myParks = [];
      parks.map(function(park) {
        parkMarker(myParks, park)
      });
    

      $parksDiv.empty();
      var parkCards = parks.map(function(park){ 
        return parkIndex(park);
      });
      $parksDiv.append(parkCards);
      

    $("#parks").addClass("parks")
    $("#map").removeClass("big-map").addClass("small-map");
      var parkLayer = map.featureLayer.setGeoJSON(myParks);
      map.fitBounds(parkLayer.getBounds());
      
      $(".icecream").click(function() {
          var park = iceCreamPark(myParks, this)
          
          myLayer.setGeoJSON({
              type: 'Feature',
              geometry: {
                  type: 'Point',
                  coordinates: [park.geometry.coordinates[0], park.geometry.coordinates[1]]
              },
              properties: {
                  'title': 'Your Park',
                  'marker-color': '#59B759',
                  'marker-symbol': 'park'
              }
           }); 

           $.post("/icecream", { lat: park.geometry.coordinates[1], long: park.geometry.coordinates[0] }).then(function(icecreams){
       
             myParks = [];
             icecreams.map(function(icecream) {
               icecreamMarker(myParks, icecream);
             });
             
             $parksDiv.empty();
             var iceCream = icecreams.map(function(icecream){ 
               return icecreamIndex(icecream);
             });
             
             $parksDiv.append(iceCream);
             
             var parkLayer = map.featureLayer.setGeoJSON(myParks);
             map.fitBounds(parkLayer.getBounds());
             
             $(".park-row").mouseenter(function(){
               parksHover(this, myParks, "#FFFF00", "large");
               map.featureLayer.setGeoJSON(myParks);
             });
             
             $(".park-row").mouseleave(function(){
               parksHover(this, myParks, "#FF6699", "medium");
               map.featureLayer.setGeoJSON(myParks);
             });
           });
             
      })
      
    $(".park-row").mouseenter(function(){
      parksHover(this, myParks, "#FFFF00", "large");
      map.featureLayer.setGeoJSON(myParks);
    });
    
    $(".park-row").mouseleave(function(){
      parksHover(this, myParks, "#00acc1", "medium");
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
    myParks = [];
    parks.map(function(park) {
      parkMarker(myParks, park)
    });
  
      $parksDiv.empty();
      var parkCards = parks.map(function(park){ 
        return parkIndex(park);
      });
      $parksDiv.append(parkCards);
        
     $("#parks").addClass("parks")
     $("#map").removeClass("big-map").addClass("small-map");
      var parkLayer = map.featureLayer.setGeoJSON(myParks);
      map.fitBounds(parkLayer.getBounds());
      
      $(".icecream").click(function() {
        
          var park = iceCreamPark(myParks, this)

          myLayer.setGeoJSON({
              type: 'Feature',
              geometry: {
                  type: 'Point',
                  coordinates: [park.geometry.coordinates[0], park.geometry.coordinates[1]]
              },
              properties: {
                  'title': 'Your Park',
                  'marker-color': '#59B759',
                  'marker-symbol': 'park'
              }
           }); 

           $.post("/icecream", { lat: park.geometry.coordinates[1], long: park.geometry.coordinates[0] }).then(function(icecreams){
       
             myParks = [];
             icecreams.map(function(icecream) {
               icecreamMarker(myParks, icecream);
             });
             
             $parksDiv.empty();
             var iceCream = icecreams.map(function(icecream){ 
               return icecreamIndex(icecream);
             });
             
             $parksDiv.append(iceCream);
             
             var parkLayer = map.featureLayer.setGeoJSON(myParks);
             map.fitBounds(parkLayer.getBounds());
             
             $(".park-row").mouseenter(function(){
               parksHover(this, myParks, "#FFFF00", "large");
               map.featureLayer.setGeoJSON(myParks);
             });
             
             $(".park-row").mouseleave(function(){
               parksHover(this, myParks, "#FF6699", "medium");
               map.featureLayer.setGeoJSON(myParks);
             });
           });
             
      })
      
      $(".park-row").mouseenter(function(){
        parksHover(this, myParks, "#FFFF00", "large");
        map.featureLayer.setGeoJSON(myParks);
      });
      
      $(".park-row").mouseleave(function(){
        parksHover(this, myParks, "#00acc1", "medium");
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


//helper methods

function parkIndex(park){
    return $("<div class='row park-row'><div class='hidden'>" + park.table.id + " </div><div class='col s2 m3'>" +
              "<div class='card cyan lighten-2'>" +
              "<div class='card-content center'>" + 
              "<span class='card-title blue-text text-darken-4'>" +
              park.table.name + "</span><br><img src='" + park.table.image + "' alt='park image' height='70' width='80'> <p class='white-text'>" + park.table.address +
              "<br><button class='icecream'> Find Ice Cream Nearby </button></p><div class='card-action'><img src='" + park.table.rating_url + "' alt='rating image' width='65'> <a class='cyan-text text-darken-4 center' href='" +
              park.table.yelp_url + "' target='_blank'>View on Yelp</a> </div> </div></div> </div>");

};

function icecreamIndex(icecream){
  return $("<div class='row park-row'><div class='hidden'>" + icecream.table.id + " </div><div class='col s2 m3'>" +
            "<div class='card pink lighten-3'>" +
            "<div class='card-content center'>" + 
            "<span class='card-title pink-text text-darken-4'>" +
            icecream.table.name + "</span><p class='white-text'>" + icecream.table.address +
            "</p><div class='card-action'><img src='" + icecream.table.rating_url + "' alt='rating image' width='65'> <a class='light-blue-text text-darken-4 center' href='" +
            icecream.table.yelp_url + "' target='_blank'>View on Yelp</a> </div> </div></div> </div>");
};

function parksHover(thing, myParks, color, size){
  var all = $(thing).text();
  var index = all.slice(0, 2).trim();
  var park = myParks[index]
  park.properties['marker-color'] = color;
  park.properties['marker-size']  = size;
};

function icecreamMarker(myParks, icecream){
  myParks.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [icecream.table.longitude,icecream.table.latitude]
    },
    properties: {
      "title": icecream.table.name,
      "description": icecream.table.address,
      "marker-color": "#FF6699",
      "marker-size": "medium",
      "marker-symbol": "ice-cream"
    }
  })
};

function parkMarker(myParks, park){
  myParks.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [park.table.longitude,park.table.latitude]
    },
    properties: {
      "title": park.table.name,
      "description": park.table.address,
      "marker-color": "#00acc1",
      "marker-size": "medium",
      "marker-symbol": "park"
    }
  });
};

function iceCreamPark(myParks, thing){
  var all = $(thing).parent().parent().parent().parent().parent().text();
  var index = all.slice(0, 2).trim();
  return myParks[index]
};
