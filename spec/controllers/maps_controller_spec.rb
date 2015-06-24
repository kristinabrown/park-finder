require "rails_helper"

RSpec.describe MapsController, type: :controller do
  describe "GET index" do
    it "renders the index" do
      expect(response).to have_http_status(:success)
    end
  end
  
  describe "POST park_finder" do
    it "returns stuff" do
      VCR.use_cassette("search_results") do
        xhr :post, :park_finder, {lat:39.749964,  long: -105.000012}
      
        expect(response).to have_http_status(:success)
      end
    end
  end
  
  describe "POST icecream_finder" do
    it "returns stuff" do
      VCR.use_cassette("search_results_icecream") do
        xhr :post, :icecream_finder, {lat:39.749964,  long: -105.000012}
      
        expect(response).to have_http_status(:success)
      end
    end
  end
end