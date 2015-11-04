(function(root){

  var FEED_CHANGE = 'FEED_CHANGE';
  var _userFeed = [];
  var _isFirstPage = true;
  var _isLastPage = false;

  var _updateUserFeed = function(payload) {
    _userFeed = payload.feed;
    _isFirstPage = payload.firstPage;
    _isLastPage = payload.lastPage;
    UserFeedStore.emit(FEED_CHANGE)
  };

  var _addLike = function(like) {
    var adventureToLike = _userFeed.find(function(adventure){
      return adventure.id == like.adventure_id;
    })
    if (adventureToLike) {
      adventureToLike.current_user_save = like;

    }
      UserFeedStore.emit(FEED_CHANGE)
  };

  var _removeLike = function(like) {
    var adventureToLike = _userFeed.find(function(adventure){
      return adventure.id == like.adventure_id;
    })
    if (adventureToLike) {
      adventureToLike.current_user_save = undefined;

    }
      UserFeedStore.emit(FEED_CHANGE)
  };

  root.UserFeedStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _userFeed;
    },

    firstPage: function() {
      return _isFirstPage;
    },

    lastPage: function() {
      return _isLastPage;
    },
    

    addChangeEventListener: function(callback) {
      UserFeedStore.addListener(FEED_CHANGE, callback);
    },

    removeChangeEventListener: function(callback) {
      UserFeedStore.removeListener(FEED_CHANGE, callback);
    },

    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {  
        case UserFeedConstants.FEED_RECEIVED: 
          _updateUserFeed(action.payload);
          break;
        case AdventureLikeConstants.LIKE_CREATED:
          _addLike(action.payload);
          break;
        case AdventureLikeConstants.LIKE_DELETED:
          _removeLike(action.payload);
        default:
        break;
      }
    })

  });

})(this)