(function(root){
  var CURRENT_USER_CHANGE = "CURRENT_USER_CHANGE";
  var _userInfo = {};

  var _updateCurrentUser = function(user) {
    _userInfo["currentUser"] = user.current_user;
    _userInfo["savedAdventures"] = user.saved_adventures;
    _userInfo["userAdventures"] = user.user_adventures;
    CurrentUserStore.emit(CURRENT_USER_CHANGE)
  };

  var _removeLikedAdventure = function(like) {
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
      CurrentUserStore.emit(CURRENT_USER_CHANGE);
  };

  var _addLikedAdventure = function(like) {
    var userAdventures = _userInfo["userAdventures"];
    var indx = _.findIndex(userAdventures, function(adventure){  return adventure.id == like.adventure_id})
    var adventureToSave = userAdventures[indx] 
    adventureToSave.current_user_save = like;
    _userInfo['savedAdventures'].push(adventureToSave);
    CurrentUserStore.emit(CURRENT_USER_CHANGE);
  }

  root.CurrentUserStore = _.extend({}, EventEmitter.prototype, {
    currentUser: function() {
      return _userInfo["currentUser"];
    },
    savedAdventures: function() {
      return _userInfo["savedAdventures"];
    },
    userAdventures: function() {
      return _userInfo["userAdventures"];
    },

    addChangeEventListener: function(callback) {
      this.addListener(CURRENT_USER_CHANGE, callback);
    },

    removeChangeEventListener: function(callback) {
      this.removeListener(CURRENT_USER_CHANGE, callback)
    },

    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case CurrentUserConstants.CURRENT_USER_RECIEVED:
          _updateCurrentUser(action.payload);
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