(function(root){
  var ACTIVITIES_CHANGED = "ACTIVITIES_CHANGED";

  var _activities = [];

  var _updateAllActivities = function(activities) {
    _activities = activities;
    ActivityStore.emit(ACTIVITIES_CHANGED)
  }
  root.ActivityStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _activities;
    },
    addActivityChangeListener: function(callback) {
      this.addListener(ACTIVITIES_CHANGED, callback);
    },

    removeActivityChangeListener: function(callback) {
      this.removeListener(ACTIVITIES_CHANGED, callback);
    },

    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case ActivityConstants.ACTIVITIES_RECIEVED:
          _updateAllActivities(action.payload);
          break;
        default:
          break;
      }
    })
  });
})(this)