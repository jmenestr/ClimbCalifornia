(function(root){
  var USER_CHANGE = "USER_CHANGE";
  var USERS_CHANGE = "USERS_CHANGE";

  var _userInfo = {};
  var _users = [];

  var _updateCurrentUser = function(user) {
    _userInfo["currentUser"] = user.current_user;
    _userInfo["savedAdventures"] = user.saved_adventures;
    _userInfo["userAdventures"] = user.user_adventures;
    _userInfo["userLists"] = user.user_lists;
    UserStore.emit(USER_CHANGE)
  };

  var _updateUsers = function(users) {
    _users = users;
    UserStore.emit(USERS_CHANGE);
  };

  var _removeLikedAdventure = function(like) {
    if (!_userInfo['currentUser']) {
      return ;
    }
    if (_userInfo["currentUser"] && _userInfo["currentUser"].id == like.user_id) {
      var likedAdventures = _userInfo["savedAdventures"];
      var new_saved_adventures =
        likedAdventures.filter(function(liked_adventure){
          return (liked_adventure.id !== like.adventure_id)
        });
        _userInfo["savedAdventures"] = new_saved_adventures;
        var indx = _.findIndex( _userInfo["userAdventures"], function(adventure){  return adventure.id == like.adventure_id})
        if (indx !== -1) {
          _userInfo["userAdventures"][indx].current_user_save = undefined;
        }
    } else if (_userInfo["currentUser"] && _userInfo["currentUser"].id != like.user_id) {
       var savedAdventure =  _.find(_userInfo["savedAdventures"], function(adventure) {
          return adventure.id == like.adventure_id;
        });
       if (savedAdventure) {
          savedAdventure.current_user_save = undefined;
       }
      var userAdventure =  _.find(_userInfo["userAdventures"], function(adventure) {
        return adventure.id == like.adventure_id;
      });
      if (userAdventure) {

        userAdventure.current_user_save = undefined;
      }

    }
        UserStore.emit(USER_CHANGE);  
  };

  var _addLikedAdventure = function(like) {

    if (!_userInfo['currentUser']) {
      return ;
    }

    if ( _userInfo["currentUser"].id == like.user_id) {
      var userAdventures = _userInfo["userAdventures"];
      var indx = _.findIndex(userAdventures, function(adventure){  return adventure.id == like.adventure_id})
      var adventureToSave = userAdventures[indx] 
      adventureToSave.current_user_save = like;
      _userInfo['savedAdventures'].push(adventureToSave);
    } else if ( _userInfo["currentUser"].id != like.user_id) {
       var savedAdventure =  _.find(_userInfo["savedAdventures"], function(adventure) {
          return adventure.id == like.adventure_id
        });
       if (savedAdventure) { savedAdventure.current_user_save = like;}
      var userAdventure =  _.find(_userInfo["userAdventures"], function(adventure) {
        return adventure.id == like.adventure_id;
      })
      if (userAdventure) {userAdventure.current_user_save = like;}

    }
      UserStore.emit(USER_CHANGE); 
  };

  var _addUserFollow = function(follow) {
    if (_userInfo['currentUser']) {
      _userInfo['currentUser'].current_user_follow = follow;
      UserStore.emit(USER_CHANGE); 
    }
    var userToFollow =  _.find(_users, function(user) {
        return user.id == follow.followee_id;
      })
    if (userToFollow) {
      userToFollow.current_user_follow = follow;
      UserStore.emit(USERS_CHANGE); 
    }

  };

  var _removeUserFollow = function(follow) {
    if (_userInfo['currentUser']) {
      _userInfo['currentUser'].current_user_follow = undefined;
      UserStore.emit(USER_CHANGE); 
    }
    var userToFollow =  _.find(_users, function(user) {
        return user.id == follow.followee_id;
      })
    if (userToFollow) {
      userToFollow.current_user_follow = undefined;
      UserStore.emit(USERS_CHANGE); 
    }
  };



  root.UserStore = _.extend({}, EventEmitter.prototype, {
    currentUser: function() {
      return _userInfo["currentUser"];
    },

    all: function() {
      return _users;
    },

    savedAdventures: function() {
      return _userInfo["savedAdventures"];
    },
    userAdventures: function() {
      return _userInfo["userAdventures"];
    },

    userLists: function() {
      return _userInfo['userLists'];
    },

    addCurrentChangeEventListener: function(callback) {
      this.addListener(USER_CHANGE, callback);
    },

    removeCurrentChangeEventListener: function(callback) {
      this.removeListener(USER_CHANGE, callback)
    },

     addUsersChangeEventListener: function(callback) {
      this.addListener(USERS_CHANGE, callback);
    },

    removeUsersChangeEventListener: function(callback) {
      this.removeListener(USERS_CHANGE, callback)
    },


    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case UserConstants.USER_RECIEVED:
          _updateCurrentUser(action.payload);
          break;
        case UserConstants.USERS_RECEIVED:
          _updateUsers(action.payload);
          break;
        case AdventureLikeConstants.LIKE_DELETED:
          _removeLikedAdventure(action.payload);
          break;
        case AdventureLikeConstants.LIKE_CREATED:
          _addLikedAdventure(action.payload);
          break;
        case UserFollowConstants.FOLLOW_CREATED:
          _addUserFollow(action.payload);
          break;
        case UserFollowConstants.FOLLOW_DELETED:
          _removeUserFollow(action.payload);   
          break;
        default:
          break;

      }
    })
  })
})(this)