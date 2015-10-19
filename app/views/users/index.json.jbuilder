json.array! @users do |user|
  json.extract! user, :id, :name
  json.profile_pic user.images.empty? ? 'http://tllg.net/J7xXX8FXUlU5v5JN1' : user.images.first.image_url
  json.current_user_follow user.passive_relationships.find{ |follow| follow.follower_id = current_user.id}
end