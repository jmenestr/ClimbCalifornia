json.extract! @current_user, :id, :name
json.lists @current_user.lists do |list|
  json.partial! 'api/lists/list', locals: { list: list }
end