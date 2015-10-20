(function(root){
  var CURRENT_USER_CHANGE = "CURRENT_USER_CHANGE";

  var _current_user = {};

  var _updateCurrentUser = function(current_user) {
    _current_user = current_user;
    CurrentUserStore.emit(CURRENT_USER_CHANGE);
  };

  var _updateLists = function(list) {
    _current_user.lists.push(list);
    CurrentUserStore.emit(CURRENT_USER_CHANGE);
  }

  root.CurrentUserStore = _.extend({}, EventEmitter.prototype, {
    currentUser: function() {
      return _current_user;
    },

    addCurrentUserChangeListener: function(callback) {
      this.addListener(CURRENT_USER_CHANGE, callback);
    },

    removeCurrentUserChangeListener: function(callback) {
      this.removeListener(CURRENT_USER_CHANGE, callback);
    },

    dispatcherId: AppDispatcher.register(function(action){
      switch (action.actionType) {
        case UserConstants.CURRENT_USER_RECEIVED:
          _updateCurrentUser(action.payload);
          break;
        case ListConstants.LIST_CREATED:
          _updateLists(action.payload);
        default: 
          break;
      }
    })

  });


})(this)