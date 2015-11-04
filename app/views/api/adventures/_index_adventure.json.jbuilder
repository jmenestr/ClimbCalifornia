json.extract! adventure, :id, :title, :lat, :lng, :location_name
json.image adventure.images.first
json.distance number_to_human(adventure.distance_to(location))
json.number_saves adventure.adventure_likes.length
json.current_user_save adventure.adventure_likes.find { |save| save.user_id == current_user.id }