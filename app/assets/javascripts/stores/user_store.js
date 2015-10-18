(function(root){
  var CURRENT_USER_CHANGE = "CURRENT_USER_CHANGE";
  var USERS_CHANGE = "USERS_CHANGE";

  var _userInfo = {};
  var _users = [];

  var _updateCurrentUser = function(user) {
    _userInfo["currentUser"] = user.current_user;
    _userInfo["savedAdventures"] = user.saved_adventures;
    _userInfo["userAdventures"] = user.user_adventures;
    UserStore.emit(CURRENT_USER_CHANGE)
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
        UserStore.emit(CURRENT_USER_CHANGE);  
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
      UserStore.emit(CURRENT_USER_CHANGE); 
  }

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

    addCurrentChangeEventListener: function(callback) {
      this.addListener(CURRENT_USER_CHANGE, callback);
    },

    removeCurrentChangeEventListener: function(callback) {
      this.removeListener(CURRENT_USER_CHANGE, callback)
    },

     addUsersChangeEventListener: function(callback) {
      this.addListener(USERS_CHANGE, callback);
    },

    removeUsersChangeEventListener: function(callback) {
      this.removeListener(USERS_CHANGE, callback)
    },


    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case UserConstants.CURRENT_USER_RECIEVED:
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
        default:
          break;

      }
    })
  })
})(this)