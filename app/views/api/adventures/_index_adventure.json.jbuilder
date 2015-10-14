json.extract! adventure, :id, :title, :lat, :lng, :location_name
json.author do 
  json.extract! adventure.author, :name
end