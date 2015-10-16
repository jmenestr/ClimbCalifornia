(function(root){
  var CURRENT_USER_CHANGE = "CURRENT_USER_CHANGE";
  var _currentUser = {};

  var _updateCurrentUser = function(user) {
    _currentUser = user;
    UserStore.emit(CURRENT_USER_CHANGE)
  }

  var UserStore = UserStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _currentUser;
    },

    addChangeEventListener: function(callback) {
      this.addListener(CURRENT_USER_CHANGE, callback);
    },

    removeChangeEventListener: function(callback) {
      this.removeListener(CURRENT_USER_CHANGE, callback)
    },

    dispatcherId: AppDispatcher.register(function(action) {
      
    })
  })
})(this)