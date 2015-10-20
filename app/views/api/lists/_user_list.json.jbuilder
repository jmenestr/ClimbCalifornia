json.extract! list, :id, :title
# Need to set default image for 
json.image !list.images.empty? ? list.images.first.image_url : "#"