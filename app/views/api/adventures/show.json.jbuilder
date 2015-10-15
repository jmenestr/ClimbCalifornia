json.extract! @adventure, :id, :description, :lat, :lng, :location_name
json.images do 
  json.array! @adventure.images, :image_url
end
json.features  do 
  json.array! @adventure.features, :name
end
json.author do 
  json.extract! @adventure.author, :name
end