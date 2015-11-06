#Climb California 

__Climb California is a rich web application built with Ruby on Rails and React.js_

Users can create climbing trips, search for trips based on features and location, and follow users with similiar interests. 

## Feature Highlights


### Complex user search over multiple tables 
 
  * Users can search for other users based on what kind of activitiy tags that other user has created or liked

<pre>

  # Joins users table on both adventures table and adventure_likes table to grab user's created and liked adventures 
  # Next joins on adventure_activities and filters based on an IN clause of activity ids which are passed in from an 
  AJAX request
  
   users = users.joins("LEFT OUTER JOIN adventures ON adventures.user_id = users.id")
      .joins("LEFT OUTER JOIN adventure_likes ON adventure_likes.user_id = users.id")
      .joins("JOIN adventure_activities ON (adventure_activities.adventure_id = adventure_likes.adventure_id OR adventure_activities.adventure_id = adventures.id)")
      .where("adventure_activities.activity_id": activities)
      .group("users.id")
</pre>

### User Feed 
  * Lists adventures that I think the user may like based on who the user is following, what the user has liked, and the associated activity tags with those trips. It excludes the user's own trips. 

<pre>
    # Grabs activity_ids associated with current user's created adventures
    user_activitiy_ids = 
    AdventureActivity.joins(:adventure)
    .where("adventures.user_id = ?", current_user.id)
    .pluck(:activity_id)

    # Grabs user_ids of all people the Current User is following 
    following_user_ids = current_user.following.pluck(:id).uniq

    # In summary, the following query grabs joins adventures to all likes, follows, and adventure_activities and keeps the following to display: 
    # 1. Any adventures the current user likes 
    # 2. Any adventures that have been liked or created by people the current user follows 
    # 3. Any adventures that are tagged with activities in user_activity_ids

    Adventure.joins("LEFT OUTER JOIN adventure_likes ON adventure_likes.adventure_id = adventures.id")
    .joins("LEFT OUTER JOIN follows ON follows.followee_id = adventures.user_id")
    .joins("LEFT OUTER JOIN adventure_activities ON adventure_activities.adventure_id = adventure.id")
    .where("(adventure_likes.user_id = :id OR 
     adventure_likes.user_id IN :following_ids OR 
     follows.follower_id = :id OR  
     adventure_activities.activity_id IN :activity_ids) 
     AND adventures.user_id != :id",
      id: current_user.id, following_ids: following_user_ids, activity_ids: user_activity_ids)
    .group("adventures.id")
    
</pre>

### Jbuilder serilization and chaching  

* Json responses are built using JBuilder to structure json response in logical way for front end use 
* User partials for modular jbuilder templates of discrete components 
* User jbuilder cache to prevent reloading of templates unless data has changed. This speeds up load times dramatically ( ~ 10x ) when 

<pre>
  # Example for User Feed template 

  json.cache! @feed do 
  json.feed do 
    json.partial! partial: 'api/adventures/index_adventure', collection: @feed, as: :adventure, locals: { location: @current_local}   
  end
  json.firstPage @first_last_pages[:firstPage]
  json.lastPage @first_last_pages[:lastPage]
end



</pre> 

### 3. Social Features 

*  Users can follow other users. This updates the user's feed to include the followed user's activities along with those that match their interests 
*  Users can save activities they like. These will show up in their profile as saved activities. 
*  Users can group activities in themed lists as ways of grouping smililar activities together. These can be both their own or other user's activities. 


### 4. Climbing Trip Search
* Uses Google Maps API to allow users to search for climbs via location. Moving the map will change the bounds of the search area so the climbs are tailored to your specific area.
* Distance is updated to give you distance to location from where the center of the map is located
* Allows users to seach for areas via features and/or trip activity type. This allows users to narrow down their search results for trips that fit their specific interests. 


## TODOS 
* Implement user follows/following for the user profile so user can see who they are following and who's following them 
* Implmenet notification feautre based on Web Sockets. Have users see when a new user follows them or when another likes their adventures 
* Implmement a user messaging feature where users online at the same time can chat with each other. 
