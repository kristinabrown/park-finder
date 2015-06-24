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
    
    var myParks = [];
    
    assert.ok(icecreamMarker(myParks, icecream), "icecreamMarker is a function");
  });
  
  it("parkMarker is a function", function() {
    var park = { 
      table: {
        id: 0, 
        name: "name",
        address: "address",
        rating_url: "rating url",
        yelp_url: "yelp url"
      }
    };
    
    var myParks = [];
    
    assert.ok(parkMarker(myParks, park), "parkMarker is a function");
  });

});

describe('map ajax', function(){
  beforeEach(function () {
    sinon.spy($, 'ajax');
    this.requests = [];
    this.xhr = sinon.useFakeXMLHttpRequest();
    this.xhr.onCreate = function (req) { this.requests.push(req); }.bind(this);
  });
  
  afterEach(function () {
    $.ajax.restore();
    this.xhr.restore();
  });
  
  it('parksAjax makes an AJAX call to the server', function () {
    var e = {latitude: 39, longitude: -104}
     parksAjax(e);
     assert($.ajax.calledOnce, 'We hit JQuery\'s AJAX method');
     assert.strictEqual(this.requests.length, 1, 'We made one AJAX request');
   });
   
   it('icecreamAjax makes an AJAX call to the server', function () {
     var e = {latitude: 39, longitude: -104}
      icecreamAjax(e);
      assert($.ajax.calledOnce, 'We hit JQuery\'s AJAX method');
      assert.strictEqual(this.requests.length, 1, 'We made one AJAX request');
    });
});