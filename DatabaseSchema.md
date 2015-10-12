#Schema Information 

##Users 
column name | data type | details
--- | --- | --- 
username | string | unique, not null, indexed 
avatar | string |
password_digest | string | not null 
session_token | string | not null 

##Adventure
column name | data type | details 
--- | --- | ---
title | string | not null 
description | text | not null
user_id | integer | not null, index 
avatar | string | 
lat | integer | not null
lng | integer | not null 
location | string | not null

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
I plan on using three gems: 
* [Fog AWS](https://github.com/fog/fog-aws) for image storage
* [CarrierWave](https://github.com/carrierwaveuploader/carrierwave) to handle file uploading. It will be 
added to both the User and Adventure models
* [CarrierWave::Base64](https://github.com/lebedev-yury/carrierwave-base64) for handeling base64 file encoding.
This is necessary because we are using react. React can upload files via [base64 data format](https://medium.com/@greggawatt/simple-file-uploads-in-react-js-backbone-js-and-rails-7a4ab43c7e27)
__I have attached to this proposal a working example of this sort of image creating via rails and react.__ 
__This example uses local storage for the purpose of testing__



