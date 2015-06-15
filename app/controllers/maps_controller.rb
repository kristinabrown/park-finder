class MapsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:index, :park_finder]
  respond_to :json
  
  def index

  end
  
  def park_finder
    lat = params["lat"]
    long = params["long"]
    @parks = YelpResults.parks(lat, long)
    
    respond_with @parks, status: 201, location: maps_path
  end
  
end
