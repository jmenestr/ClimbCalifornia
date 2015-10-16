
json.total_rating @total_rating
json.reviews do 
  json.partial! partial: 'review', collection: @reviews, as: :review
end