(function(root){
  var ALL_ADVENTURES_CHANGE = "ALL_ADVENTURES_CHANGE";
  var SINGLE_ADVENTURE_CHANGE = "SINGLE_ADVENTURE_CHANGE";

  var _adventures = [];
  var _currentAdventure;

  var updateAllAdventures = function(adventures) {
    _adventures = adventures;
    AdventureStore.emit(ALL_ADVENTURES_CHANGE)
  }

  var updateSingleAdventure = function(adventure) {
    _currentAdventure = adventure;
    AdventureStore.emit(SINGLE_ADVENTURE_CHANGE);
  }

  root.AdventureStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _adventures;
    },

    currentAdventure: function() {
      return _currentAdventure;
    },

    addAllAdventuresChangeListener: function(callback) {
      this.addListener(ALL_ADVENTURES_CHANGE, callback);
    },

    removeAllAdventuresChangeListener: function(callback) {
      this.removeListener(ALL_ADVENTURES_CHANGE, callback);
    },

    addSingleAdventureChangeListener: function(callback) {
      this.addListener(SINGLE_ADVENTURE_CHANGE, callback);
    },

    removeSingleAdventureChangeListener: function(callback) {
      this.removeListener(SINGLE_ADVENTURE_CHANGE, callback);
    },

    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case AdventureConstants.ADVENTURES_RECIEVED:
          updateAllAdventures(action.payload);
          break;
        case AdventureConstants.ADVENTURE_RECIEVED:
          updateSingleAdventure(action.payload);
          break;
        default:
          break;
      }
    })
  });
})(this)