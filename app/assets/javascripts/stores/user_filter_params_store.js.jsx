(function(root){

  
    var _activityFilter = {};
    var _name = "" ;

  var FILTER_CHANGE_EVENT = 'CHANGE_EVENT';


  var _addActivityToFilter = function(activity) {
    var newActivity = { }
    newActivity[activity.id] = activity.name
    _activityFilter = 
      _.extend({}, _activityFilter, newActivity)
      UserFilterParamsStore.emit(FILTER_CHANGE_EVENT);
  };

  var _removeActivityFromFilter = function(id) {
    _activityFilter =
      _.omit(_activityFilter, id);
      UserFilterParamsStore.emit(FILTER_CHANGE_EVENT);
  };

  var _updateName = function(name) {
     _name = name;
    UserFilterParamsStore.emit(FILTER_CHANGE_EVENT);
  }

  root.UserFilterParamsStore = _.extend({}, EventEmitter.prototype, {

    allParams: function() {
      return _activityFilter;
    },

    name: function() {
      return _name;
    },

    addFilterChangeEventListener: function(callback) {
      this.addListener(FILTER_CHANGE_EVENT, callback);
    },

    removeFilterChangeEventListener: function(callback) {
      this.removeListener(FILTER_CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(action){
      switch (action.actionType) {

          case UserFilterParamsConstants.ADD_ACTIVITY_FILTER:
          _addActivityToFilter(action.payload);
          break;

        case UserFilterParamsConstants.REMOVE_ACTIVITY_FILTER:
          _removeActivityFromFilter(action.payload);
          break;

        case UserFilterParamsConstants.RECEIVE_NAME:
          _updateName(action.payload);
          break;

        default:
        break;
      }
    })
  })

})(this)