json.extract! @adventure, :id,:title, :description, :avg_rating, :lat, :lng, :location_name
json.images do 
  json.array! @adventure.images, :image_url
end
json.features  do 
  json.array! @adventure.features, :name
end
json.activities do 
  json.array! @adventure.activities, :name
end

json.author do 
  json.extract! @adventure.author, :name
end
json.current_user_save @adventure.adventure_likes.find { |save| save.user_id == current_user.id }
json.reviews @adventure.reviews, partial: 'api/reviews/review', as: :review

