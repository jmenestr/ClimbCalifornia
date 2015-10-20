json.extract! @current_user, :id, :name, :lat, :lng, :location

json.profile_pic @current_user.images.first.image_url
json.lists @current_user.lists do |list|
  json.partial! 'api/lists/list', locals: { list: list }
end