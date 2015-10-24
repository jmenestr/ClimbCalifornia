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
  },

  recievePage: function(page) {
    var action = {
      actionType: FilterParamConstants.PAGE_RECEIVED,
      payload: page
    };

    AppDispatcher.dispatch(action)
  },

  // User Filter Features
  recieveUserActivityToFilter: function(activity) {
    var action = {
      actionType: UserFilterParamsConstants.ADD_ACTIVITY_FILTER,
      payload: activity
    };
    AppDispatcher.dispatch(action)
  },

    removeUserActivityFilter: function(id) {
    var action = {
      actionType: UserFilterParamsConstants.REMOVE_ACTIVITY_FILTER,
      payload: id
    };
    AppDispatcher.dispatch(action)
  },

  recieveUserNameToFilter: function(name) {
    var action = {
      actionType: UserFilterParamsConstants.RECEIVE_NAME,
      payload: name
    }

    AppDispatcher.dispatch(action)
  }
}