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

### 2. User Feed 
  * Lists adventures that I think the user may like based on who the user is following, what the user has liked, and the associated activity tags with those trips. It excludes the user's own trips. 

<pre>
       
       user_activitiy_ids = AdventureActivity.joins(:adventure).where("adventures.user_id = ?",       current_user.id).pluck(:activity_id)

    following_user_ids = current_user.following.pluck(:id).uniq


    Adventure.joins("LEFT OUTER JOIN  adventure_likes ON adventure_likes.adventure_id = adventures.id")
    .joins("LEFT OUTER JOIN follows ON follows.followee_id = adventures.user_id")
    .joins("LEFT OUTER JOIN adventure_activities ON adventure_activities.adventure_id = adventures.id")
    .where("(adventure_likes.user_id = :id OR 
     adventure_likes.user_id IN :following_ids OR 
     follows.follower_id = :id OR  
     adventure_activities.activity_id IN :activity_ids) 
     AND adventures.user_id != :id",
      id: current_user.id, following_ids: following_user_ids, activity_ids: user_activity_ids)
    .group("adventures.id")
    
</pre>

The string interpolation is an unfortuante consequence of Active Record's limitations in how it interpolates arrays when used within a more complicated where clause
### 3. Social Features 

*  Users can follow other users. This updates the user's feed to include the followed user's activities along with those that match their interests 
*  Users can save activities they like. These will show up in their profile as saved activities. 
*  Users can group activities in themed lists as ways of grouping smililar activities together. These can be both their own or other user's activities. 

### 3. Jbuilder caching for fast page renders

* I implemented jbuilder caching to speed up page loading so the rails backend does not reload templates that have not changed since last reload 

### 4. Climbing Trip Search
* Uses Google Maps API to allow users to search for climbs via location. Moving the map will change the bounds of the search area so the climbs are tailored to your specific area.
* Distance is updated to give you distance to location from where the center of the map is located
* Allows users to seach for areas via features and/or trip activity type. This allows users to narrow down their search results for trips that fit their specific interests. 


## TODOS 
* Implement user follows/following for the user profile so user can see who they are following and who's following them 
* Implmenet notification feautre based on Web Sockets. Have users see when a new user follows them or when another likes their adventures 
* Implmement a user messaging feature where users online at the same time can chat with each other. 
