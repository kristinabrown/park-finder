require "rails_helper"

RSpec.describe YelpResults do
  describe "parks" do
    it "returns search results from yelpservice" do
      VCR.use_cassette("search_results") do
        parks = YelpService.search(39.749729, -104.99998)
        expect(parks.first.name).to eq("Denver")
      end
    end
    it "returns search results from yelp results" do
      VCR.use_cassette("search_results") do
        parks = YelpResults.parks(39.749729, -104.99998)
        expect(parks.first.name).to eq("Denver")
        expect(parks.first.image).to eq("http://s3-media1.fl.yelpcdn.com/bphoto/iScDqW33rVOlJMEmWwMrSw/ms.jpg")
        expect(parks.first.rating_url).to eq("http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png")
        expect(parks.first.yelp_url).to eq("http://www.yelp.com/biz/denver-denver-2")
        expect(parks.first.address).to eq(["1350 17th St", "Northwest", "Denver, CO 80202"])
        expect(parks.first.latitude).to eq(39.7505302)
        expect(parks.first.longitude).to eq(-104.9969864)
        expect(parks.first.id).to eq(0)
      end
    end
  end
  
  describe "icecream" do
    it "returns search results from yelpservice" do
      VCR.use_cassette("search_results_icecream") do
        parks = YelpService.search_icecream(39.749729, -104.99998)
        expect(parks.first.name).to eq("The Market At Larimer Square")
      end
    end
    it "returns search results from yelp results" do
      VCR.use_cassette("search_results_icecream") do
        parks = YelpResults.icecream(39.749729, -104.99998)
        expect(parks.first.name).to eq("The Market At Larimer Square")
        expect(parks.first.rating_url).to eq("http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png")
        expect(parks.first.yelp_url).to eq("http://www.yelp.com/biz/the-market-at-larimer-square-denver")
        expect(parks.first.address).to eq(["1445 Larimer St", "Lodo", "Denver, CO 80202"])
        expect(parks.first.latitude).to eq(39.7478880733252)
        expect(parks.first.longitude).to eq(-104.999227970839)
        expect(parks.first.id).to eq(0)
      end
    end
  end
end
