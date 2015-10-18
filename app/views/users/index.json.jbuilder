json.array! @users do |user|
json.extract! user, :id, :name
json.profile_pic user.images.first.image_url
end