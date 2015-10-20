(function(root){
  var LIST_CHANGE = "LIST_CHANGE";

  var _list = {};

  var _updateList = function(list) {
    _list = list;
    ListStore.emit(LIST_CHANGE);
  };


  root.ListStore = _.extend({}, EventEmitter.prototype, {
    list: function() {
      return _list;
    },

    addChangeListener: function(callback) {
      this.addListener(LIST_CHANGE, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(LIST_CHANGE, callback);
    },

    dispatcherId: AppDispatcher.register(function(action){
      switch (action.actionType) {
        case ListConstants.LIST_RECIEVED:
          _updateList(action.payload);
          break;
        default:
          break;
      }
    })

  });


})(this)