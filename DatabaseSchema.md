#Schema Information 

##Users 
column name | data type | details
--- | --- | --- 
name | string | not null
email | string | unique, not null, indexed 
password_digest | string | not null 
session_token | string | not null 

##Adventure
column name | data type | details 
--- | --- | ---
title | string | not null 
description | text | not null
user_id | integer | not null, index 
lat | integer | not null
lng | integer | not null 
location | string | not null

##Image 
column name | data type | details
--- | --- | ---
image_url | string | not null
imageable_id | integer | not null
imageable_type | string | not null

Users and Adventures will be imagable. 
__Will be using [Geokit Rails Gem](https://github.com/geokit/geokit-rails) for location__

##Followers_Following 
column name | data type | details 
--- | --- | ---
follower_id | string | not null
followed_id | integer | not null

##Adventure_Saves 
column name | data type | details 
--- | --- | ---
adventure_id | integer | not null
user_id | integer | not null

##adventure_features 
column name | data type | details 
--- | --- | ---
adventure_id | integer | not null
feature_id | integer | not null

##features
column name | data type | details 
--- | --- | ---
type | string | not null 

##Reviews 
column name | data type | details 
--- | --- | --- 
content | text | not null 
user_id | integer | not null
adventure_id | integer | not null 
rating | integer | 

##Image Uploadloading 
I will use Cloudinary Widget. 



