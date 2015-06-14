$(document).ready(function() {
  
  L.mapbox.accessToken = $('#map-data').data('token');
  
  // var map = L.mapbox.map('map', 'kristinabrown.241388a6', { zoomControl: false })
  // .setView([39.739, -104.990], 12);
  // 
  
  var map = L.mapbox.map('map', 'kristinabrown.241388a6');
  map.setView([39.750081, -104.999703], 13);
    
});