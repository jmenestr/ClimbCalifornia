json.array! @users do |user|
  json.extract! user, :id, :name
  json.profile_pic user.images.first.image_url
  json.current_user_follow user.passive_relationships.find{ |follow| follow.follower_id = current_user.id}
end