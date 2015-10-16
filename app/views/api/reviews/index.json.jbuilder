json.average @average
json.reviews do 
  json.partial! partial: 'review', collection: @reviews, as: :review
end