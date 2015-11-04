json.cache! @adventures do 
  json.adventures do 
    json.partial! partial: 'api/adventures/index_adventure', collection: @adventures, as: :adventure, locals: {location: @current_local}
  end

  json.firstPage @first_last_pages[:firstPage]
  json.lastPage @first_last_pages[:lastPage]
end