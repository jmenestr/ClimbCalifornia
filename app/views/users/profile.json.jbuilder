json.current_user do 
  json.id @current_user.id 
  json.name @current_user.name 
  json.profile_pic @current_user.images.first.image_url
end 

json.saved_adventures do 
  json.partial! partial: 'api/adventures/index_adventure', 
  collection: @current_user.saved_adventures, as: :adventure, 
  locals: { location: @current_local}
end 

json.user_adventures do 
  json.partial! partial: 'api/adventures/index_adventure', 
  collection: @current_user.adventures, as: :adventure, 
  locals: { location: @current_local}
end 
