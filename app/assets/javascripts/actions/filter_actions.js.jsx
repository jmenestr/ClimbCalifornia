FilterActions = {
  recieveMapBounds: function(mapBounds) {
    var action = {
      actionType: FilterParamConstants.RECIEVE_MAP_BOUNDS,
      payload: mapBounds
    }
    AppDispatcher.dispatch(action);
  },

  recieveFeatureToFilter: function(feature) {
    var action = {
      actionType: FilterParamConstants.ADD_FILTER_FEATURE, 
      payload: feature
    }
    AppDispatcher.dispatch(action);
  },

  removeFeatureToFilter: function(id) {
    var action = {
      actionType: FilterParamConstants.REMOVE_FILTER_FEATURE,
      payload: id
    }
    AppDispatcher.dispatch(action);
  },

    recieveActivityToFilter: function(activity) {
    var action = {
      actionType: FilterParamConstants.ADD_FILTER_ACTIVITY, 
      payload: activity
    }
    AppDispatcher.dispatch(action);
  },

  removeActivityToFilter: function(id) {
    var action = {
      actionType: FilterParamConstants.REMOVE_FILTER_ACTIVITY,
      payload: id
    }
    AppDispatcher.dispatch(action);
  }
}