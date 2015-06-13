class YelpResults
  
  def self.parks(lat, lon)
    results = YelpService.search(lat, lon)
    
    results.map do |result|
      park = Park.new
      park.name = result.name
      park.image_url = result.snippet_image_url
      park.yelp_url = result.url
      park.address = result.location.address
      park.latitude = result.location.coordinate.latitude
      park.longitude = result.location.coordinate.longitude
      park.text_snippet = result.snippet_text
      park
    end
  end
  
end

class Park < OpenStruct
  
end