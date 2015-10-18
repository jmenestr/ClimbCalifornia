json.current_user do 
  json.id @user.id 
  json.name @user.name 
  json.profile_pic @user.images.first.image_url
end 

json.saved_adventures do 
  json.partial! partial: 'api/adventures/index_adventure', 
  collection: @user.saved_adventures, as: :adventure, 
  locals: { location: @current_local}
end 

json.user_adventures do 
  json.partial! partial: 'api/adventures/index_adventure', 
  collection: @user.adventures, as: :adventure, 
  locals: { location: @current_local}
end 
