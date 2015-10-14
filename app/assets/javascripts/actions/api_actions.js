var ApiActions = {
  recieveManyAdventures: function(adventures) {
    var action = {
      actionType: AdventureConstants.ADVENTURES_RECIEVED,
      payload: adventures
    }
    AppDispatcher.dispatch(action);
  }
}

