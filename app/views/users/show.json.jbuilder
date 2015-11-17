
json.current_user do 
  json.id @user.id 
  json.name @user.name 
  json.profile_pic @user.images.first.image_url
  json.current_user_follow @user.passive_relationships.find{ |follow| follow.follower_id = current_user.id}
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


json.user_lists do 
  json.partial! partial: 'api/lists/user_list',
  collection: @user.lists, as: :list
end 


