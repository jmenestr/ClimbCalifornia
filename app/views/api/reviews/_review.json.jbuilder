
json.extract! review, :content, :rating 
json.date time_ago_in_words(review.created_at)
json.average @average
json.review_author do 
  json.extract! review.author, :name, :id
  json.profile_pic review.author.images.first.image_url
end