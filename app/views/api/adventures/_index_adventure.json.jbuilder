json.extract! adventure, :id, :title, :lat, :lng, :location_name
json.image adventure.images.first
json.author do 
  json.extract! adventure.author, :name
end