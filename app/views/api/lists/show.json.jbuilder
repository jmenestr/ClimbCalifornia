json.extract! @list, :id, :title
json.author do 
  json.extract! @list.user, :id, :name
end
json.images do 
  json.array! @list.images.map { |image| image.image_url}
end
json.adventures do 
  json.partial! partial: 'api/adventures/index_adventure', collection: @list.adventures, as: :adventure, locals: { location: @current_local}
end