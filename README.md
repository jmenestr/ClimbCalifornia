# ClimbCalifornia
A trip sharing app for all of California's amazing climbing destinations. 


## Minimum Viable Product
Climb California is a trip sharing site focused on California Rock Climbing. Users can post and share trips with their friends. It's inspired by the site [Outbound Collective](https://www.theoutbound.com/).

Users will be able to do the following: 

* Create an account
* Log in/Log out
* Create 'Adventures'
  * Upload Feature Photo
  * Tag with features
* Add Reviews to Adventures
* Search for adventures based on the following: 
  * Location
  * Features
* Follow/Unfollow Users
* View other User profiles
* Have a feed with your saved adventures, your adventures, and the adventures of those who you are following

__Will be using [Geokit Rails Gem](https://github.com/geokit/geokit-rails) for location__
__[Bootstrap 3](http://getbootstrap.com/) will be used for styling__
## Bonus Features 
* Have a 'Other adventures you might like' list at bottom of each Adventure's show page
* Multiple Files per Adventure
* Image Carsouel for Images
* Nice CSS transitions  
* Client Side Authorization 
* Modal Forms for List Creation and Sign Up/Sign In
* Allow unlogged in Users search for adventures 
* Create Custom Lists
* Allow for more searching (skill level, type of climbing, seasons, etc)

##[Database Schema](https://github.com/jmenestr/ClimbCalifornia/blob/master/DatabaseSchema.md)
##[App Structure](https://github.com/jmenestr/ClimbCalifornia/blob/master/OverallStructure.md)

#Implementation Details

#Phase 1 -- Basic Setup of needed Gems, authetication, and API interface 
### 1.5 Days
In phase 1, I will implement user signup and authentication (basic Bcrypt). After sign in, there will be a main landing page that will hold the application's root React component. Before going further, I'll begin with building the full JSON API for Adventures and Users. 

###Models 
* User 
* Adventure 
* adventure_features
* Features
* following_followed
* adventure_saves

###Controllers 
* UsersController (#new, #create, #index, #show, #feed)
* SessionsController (#new, #create)
* Api::AdventuresController (create, index, show)
* Api::FeaturesConstroller (index)

###Views 
* users/new.index/html
* sessions/new.index.html
* users/feed/json.jbuilder
* users/index/json.jbuilder
* users/show/json.jbuilder
* features/index/json.jbuilder
* adventures/index.json.jbuilder
* adventures/show.json.jbuilder 

##Phase 2 -- Setting up the basic CRUD react components needed for the app 

###2 Days

In phase 2, I will build out the interface for the UserFeed, Create Adventure, User Show/Index pages, and Adventure Show Page. I will set up the basic structure as well as create components that I will be using for the rest of my phases. 

###Flux Componenets Needed
* UserFeed
* AdventureIndexItem
* Adventure
* AdventureForm
* UserIndex 
* UserIndexItem 
* FollowButton
* SaveButton

###Stores Needed
* UserFeed 
* UserStore
  * _users
  * _selectedUser
* AdventureStore
  # _selectedAdventure

###Actions Needed 
* ApiAction.recievedUsers
* ApiAction.recievedSingleUser
* ApiAction.recievedFeed 
* ApiAction.toggleFollow
* ApiAction.toggleSave
* ApiAction.adventureCreated 
* ApiAction.recievedSingleAdventure

Upon login, User will be landed on UserFeed page. Upon mount, UserFeed will call ApiUtils.fetchUserFeed(). UserFeed will also mount a Change listener to the UserFeed store to for the UserFeed to load. The User Feed will consist of the user's own adventures, saved adventures, and those of people the user is following. The Feed will also listen to toggleSave Events. If one is initiated on a current item of the feed, the UserFeed store will respond by removing that item from the feed and calling a change even.

The AdventureForm will be a seperate page. The User will be able to load a picture, select a title, write a description, and select from a list of features about the adventure. In addition, the User will be able to Search via google Maps's autocomplete search API for a location. This locaiton will be stored as the adventure's lat/lng state. Upon submittion, the user will be redirected to the Adventure's show page. 

The Adventure Show page will be a basic show page listing the details of the specific Adventure. It will link to the author show page. The path will be /adventure/:adventure_id and will load all needed details for that adventure. Upon load, this will send a fetch request to fetchSingleAdventure. The fetch will generate an ApiAction.singleAdventureRecieved. The Adventure show page will be lsiting for this event and will update it's state accordingly. 

_Bonus for Adventure Show/Form page_

* For form, upon user input for a location, update a inbeded google of with that location.
* For show page, have a map showing location of that adventure

The User index page will, upon mounting, fire off a fetchUsers request. This will be response for initiating the required action to load users. Each UserIndexItem will be able to be followed/unfollowed. ToggleFollow will set of chain of events to update correct user's following status as needed, setting off a re rerender of the state. 

Upon loading a user's page, (path /user/:user_id), the UserIndex will set of 
ApiAction.recievedSingerUser where the user along with all associated adventures will be loaded. These will be iterated through and put into an AdventureIndexItem. There will also be a follow button on the User's Page to follow/unfollow. A toggle of this button will set of a change event and the UserIndex coponent will call a UserStore.currentUser().

##Phase 3 -- Adding an Adventure Index Page 

##1.5 Days
Phase 3s goal will be to build up the basic Adventures Index page where the user can see those adventures location on a map. This will be a pre-step before I implement location and feature based searching. 

This will be navigatiable from the menu as a 'Discover More' link. The path will be /discover.

Upon page load, the default location will be set to San Francisco. Upon Mount, this component will set off a fetch to fetAdventures(bounds, 'features' <- to be implemented) where the bounds are the bounds of the map. This will create an action ApiAction.recievedAdventures which will then set off a change event that will call for AdventuresIndex to reset it's list of adventures (passed down via props to the index items) and a callback will be initiated in maps to draw markers for all the inbound adventures. 

* Left Column showing Adventures based in order of distance from user
* Right Google maps API displaying these adventures on the map

###Flux Components Needed
* Search
  * AdventuresIndex
    * AdventuresIndexItem
  * Map

###Stores Needed 
* Adventures 

### Actions Needed 
ApiActions.recieveAdventures

##Phase 4 -- Adding a searchable map 

###1 Day
Phase 4's goals will build upon Phase 3. I will add location based searching. To implement I will use google Map's places API to allow for autocomplete based location searching. Upon entering a location, the map will then go there. I will handle this even, along with map moves, by setting new bounds via a FilterParams Store. I will also add feature based searching to filter results by what features they have. 

How to handle the changeBounds event: 
  After enter event for a new place and a map move event, I will use the appropriate google API to find the new bounds of the map. I will use these bounds to fire off a FilterActions.RecieveMapBounds action to the store. The store will then fire off it's change emitter and the Search componenet, lisitinig to these changes, will fire off a fetchAdventures with the new bounds. 
  In the map and AdventuresIndex, I will have a change listener that, upon recipt of the new adventures, will update their state accordings. 

How to handle the features filter: 
  I will have a multiselect dropdown where users can select features. Upon change, this will set off a FilterActions.RecieveFeatures event, thus changed the store and ultimtalty the Search's state. Upon this, the search component will fire off a new fetch with the current bounds.

###Stores Needed
* FilterParams
  _currentMapBounds
  _currentFeatures

###Actions Needed
* FilterActions.RecieveMapBounds
* FilterActions.RecieveFeatures 

##Phase 5 -- Adding Reviews

###1 Day
Phase 5 will see review's added to the adventures. This will be an onpage form where user's can add reviews to individual adventures. Each review will also have an associated rating. Each Adventure will be preloaded with it's associated reviews which will be passed down to the Reviews Component as props. 
Submission of a Review will create a ApiAction.reviewRecieved. This will update the _selectedAdventure in the store and will then prompt a rerender. 

#Model
* Reviews

###Flux Componenets Needed 
* ReviewForm
* Reviews
  * ReviewItem

##Actions Needed
* ApiActions.reviewRecieved

##Phase 6 -- CSS and Seeding

###1 Day
Phase 6 will focus on adding custom CSS styles to the componenets to give a more polisehd look. I will also add seed data. I will focus on three areas: San Francisco, Los Angles, and The Eastern Sierra. 

##Bonus 
* User's can create custom, themed lists of adventures. This will show up on their feed as a seperate tab of lists. Clicking on each list will allow them to view all the adventures in said list
* Nice carsouel of multiple images for each adventure. 
