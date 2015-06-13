require 'net/http'
require 'uri'
require 'json'

class YelpService
  
  def self.search(lat, lon)
    coordinates = { latitude: lat, longitude: lon }
    params = { term: "parks", radius: 5000, sort: 1}
    Yelp.client.search_by_coordinates(coordinates, params).businesses
  end
  
end