class YelpResults
  
  def self.parks(lat, lon)
    results = YelpService.search(lat, lon)
    count = 0
    results.map do |result|
      park = Park.new
      park.name = result.name
      park.image = result.image_url
      park.rating_url = result.rating_img_url
      park.yelp_url = result.url
      park.address = result.location.display_address
      park.latitude = result.location.coordinate.latitude
      park.longitude = result.location.coordinate.longitude
      park.text_snippet = result.snippet_text
      park.id = count += 1
      park
    end
  end
  
end

class Park < OpenStruct
  
end