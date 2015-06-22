describe("park index", function() {
  
  // var should;
  // beforeEach(function() {
  //   should = window.should();
  // });

  it("will send through some html", function() {
    var park = {
      table: {
        id: 0, 
        name: "name",
        image: "image",
        address: "address",
        rating_url: "rating url",
        yelp_url: "yelp url"
      }
    }
    parkIndex(park).should.be.a('function');
      // parkIndex(park).should.equal("hi");
  });

});