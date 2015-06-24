//= require chai
//= require map
var assert = chai.assert;

describe('map functions', function() {
  
  it("parkIndex is a fucntion", function() {
    var park = { 
      table: {
        id: 0, 
        name: "name",
        image: "image",
        address: "address",
        rating_url: "rating url",
        yelp_url: "yelp url"
      }
    };
    
    assert.ok(parkIndex(park), "parkIndex is a function");
  });
  
  it("icecreamIndex is a function", function() {
    var icecream = { 
      table: {
        id: 0, 
        name: "name",
        address: "address",
        rating_url: "rating url",
        yelp_url: "yelp url"
      }
    };
    
    assert.ok(icecreamIndex(icecream), "icecreamIndex is a function");
  });
  
  it("iceCreamMarker is a function", function() {
    var icecream = { 
      table: {
        id: 0, 
        name: "name",
        address: "address",
        rating_url: "rating url",
        yelp_url: "yelp url"
      }
    };
    
    assert.ok(parksHover(thing, myParks, color, size), "parksHover is a function");
  });

});