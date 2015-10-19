(function(root){

  var FEED_CHANGE = 'FEED_CHANGE';
  var _userFeed = [];

  var _updateUserFeed = function(feed) {
    _userFeed = feed;
    UserFeedStore.emit(FEED_CHANGE)
  };

  root.UserFeedStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _userFeed;
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
        default:
        break;
      }
    })

  });

})(this)