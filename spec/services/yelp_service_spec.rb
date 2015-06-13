require "rails_helper"

RSpec.describe YelpResults do
  describe "parks" do
    it "returns search results" do
      VCR.use_cassette("search_results") do
        parks = YelpResults.parks(39.749729, -104.99998)
        expect(parks.first.name).to eq("Skyline Park")
      end
    end
  end
end
