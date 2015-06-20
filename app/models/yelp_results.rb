class YelpResults
  
  def self.parks(lat, lon)
    results = YelpService.search(lat, lon)
    count = -1
    results.map do |result|
      park = Park.new
      park.name = result.name
      park.image = result.image_url
      park.rating_url = result.rating_img_url
      park.yelp_url = result.url
      park.address = result.location.display_address
      park.latitude = result.location.coordinate.latitude
      park.longitude = result.location.coordinate.longitude
      park.id = count += 1
      park
    end
  end
  
  def self.icecream(lat, lon)
    results = YelpService.search_icecream(lat, lon)
    count = -1
    results.map do |result| 
      ic = IceCream.new
      ic.name = result.name
      ic.rating_url = result.rating_img_url
      ic.yelp_url = result.url
      ic.address = result.location.display_address
      ic.latitude = result.location.coordinate.latitude
      ic.longitude = result.location.coordinate.longitude
      ic.id = count += 1
      ic
    end
  end
  
end

class IceCream < OpenStruct
end

class Park < OpenStruct
  
end