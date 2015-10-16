(function(root){

  var _filterParams = {
    mapBounds: {},
    featureFilter: {},
    activityFilter: {}
  }

  var FILTER_CHANGE_EVENT = 'CHANGE_EVENT';

  var _updatePositionBounds = function(mapBounds) {
      _filterParams['mapBounds'] = mapBounds;
      FilterParamsStore.emit(FILTER_CHANGE_EVENT);
    };

  var _addFeatureToFilter = function(feature) {
    var newFeature = { }
    newFeature[feature.id] = feature.name
    _filterParams.featureFilter = 
      _.extend({}, _filterParams.featureFilter, newFeature)
      FilterParamsStore.emit(FILTER_CHANGE_EVENT);
  };

  var _removeFeatureFromFilter = function(id) {
    _filterParams.featureFilter =
      _.omit(_filterParams.featureFilter, id);
      FilterParamsStore.emit(FILTER_CHANGE_EVENT);
  };

  var _addActivityToFilter = function(activity) {
    var newActivity = { }
    newActivity[activity.id] = activity.name
    _filterParams.activityFilter = 
      _.extend({}, _filterParams.activityFilter, newActivity)
      FilterParamsStore.emit(FILTER_CHANGE_EVENT);
  };

  var _removeActivityFromFilter = function(id) {
    _filterParams.activityFilter =
      _.omit(_filterParams.activityFilter, id);
      FilterParamsStore.emit(FILTER_CHANGE_EVENT);
  }

  root.FilterParamsStore = _.extend({}, EventEmitter.prototype, {

    allParams: function() {
      return _filterParams;
    },

    addFilterChangeEventListener: function(callback) {
      this.addListener(FILTER_CHANGE_EVENT, callback);
    },

    removeFilterChangeEventListener: function(callback) {
      this.removeListener(FILTER_CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(action){
      switch (action.actionType) {
        case FilterParamConstants.RECIEVE_MAP_BOUNDS:
          _updatePositionBounds(action.payload);
          break;

        case FilterParamConstants.ADD_FILTER_FEATURE:
          _addFeatureToFilter(action.payload);
          break;

        case FilterParamConstants.REMOVE_FILTER_FEATURE:
          _removeFeatureFromFilter(action.payload);
          break;

          case FilterParamConstants.ADD_FILTER_ACTIVITY:
          _addActivityToFilter(action.payload);
          break;

        case FilterParamConstants.REMOVE_FILTER_ACTIVITY:
          _removeActivityFromFilter(action.payload);
          break;

        default:
        break;
      }
    })
  })

})(this)