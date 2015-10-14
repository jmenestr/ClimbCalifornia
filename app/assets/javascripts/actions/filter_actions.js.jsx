FilterActions = {
  recieveMapBounds: function(mapBounds) {
    var action = {
      actionType: FilterParamConstants.RECIEVE_MAP_BOUNDS,
      payload: mapBounds
    }
    AppDispatcher.dispatch(action);
  }
}