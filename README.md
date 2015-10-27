#Climb California 

Welcome to [www.climbcalifornia.xyz](Climb California). California is home to some of the worlds best rock climbing and bosts an overwheliming quanity and variety of rock. From beach bouldering to desert granite to high elevation alpine climbing nesteled deep in the backcountry, my site aims to allow users to share their experiences and seek out new ones. 

__The site is built with a rails API backend and a React.js front end__

##Site Features 
### 1. Climbing Trip Search
* Uses Google Maps API to allow users to search for climbs via location. Moving the map will change the bounds of the search area so the climbs are tailored to your specific area.
* Distance is updated to give you distance to location from where the center of the map is located
* Allows users to seach for areas via features and/or trip activity type. This allows users to narrow down their search results for trips that fit their specific interests. 

### 2. User Search 
  * Name search allows you to search users by a general name match 
  * Activity search is a more advanced search allowing user to search users based on activities. It works by only including users who have either liked or created trips with the checked activity you choose. The code for the query is as follows 

<pre>
   users = users.joins("LEFT OUTER JOIN adventures ON adventures.user_id = users.id")
      .joins("LEFT OUTER JOIN adventure_likes ON adventure_likes.user_id = users.id")
      .joins("JOIN adventure_activities ON (adventure_activities.adventure_id = adventure_likes.adventure_id OR adventure_activities.adventure_id = adventures.id)")
      .where("adventure_activities.activity_id": activities)
      .group("users.id")
</pre>

### 3. User Feed 
  * Lists adventures that I think the user may like based on who the user is following, what the user has liked, and the associated activity tags with those trips. It excludes the user's own trips. 

<pre>
       user_activities = AdventureActivity.joins(:adventure).where("adventures.user_id = ?", current_user.id).pluck(:activity_id)
    if user_activities.length == 0 
      activities = "(-1)"
    else  
      activities = "(" + user_activities.join(",") + ")"
    end
      activity_ids = "OR adventure_activities.activity_id IN #{activities}"
    following_users = current_user.following.pluck(:id).uniq
    if (following_users.length == 0) 
      following = "(-1)"
    else
      following = "(" + following_users.join(",") + ")"
    end
    following_ids = "OR adventure_likes.user_id IN #{following}"

    adventures = Adventure.joins("LEFT OUTER JOIN  adventure_likes ON adventure_likes.adventure_id = adventures.id")
    .joins("LEFT OUTER JOIN follows ON follows.followee_id = adventures.user_id")
    .joins("LEFT OUTER JOIN adventure_activities ON adventure_activities.adventure_id = adventures.id")
    .where("(adventure_likes.user_id = :id #{following_ids} OR follows.follower_id = :id #{activity_ids}) AND adventures.user_id != :id",
      id: current_user.id)
    .group("adventures.id")
    adventures 
</pre>

The string interpolation is an unfortuante consequence of Active Record's limitations in how it interpolates arrays when used within a more complicated where clause
### 4. Social Features 

*  Users can follow other users. This updates the user's feed to include the followed user's activities along with those that match their interests 
*  Users can save activities they like. These will show up in their profile as saved activities. 
*  Users can group activities in themed lists as ways of grouping smililar activities together. These can be both their own or other user's activities. 


