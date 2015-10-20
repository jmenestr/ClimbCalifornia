(function(root){
  var LIST_CHANGE = "LIST_CHANGE";
  var LIST_DELETED = "LIST_DELETED";

  var _list = {};

  var _updateList = function(list) {
    _list = list;
    ListStore.emit(LIST_CHANGE);
  };

  var _addLike = function(like) {
    var adventureToLike = _.find(_list.adventures, function(adventure) {
      return adventure.id == like.adventure_id;
    });
    if (adventureToLike) {

    adventureToLike.current_user_save = like;
    ListStore.emit(LIST_CHANGE);
    }
  };

    var _removeLike = function(like) {
    var adventureToUnlike = _.find(_list.adventures, function(adventure) {
      return adventure.id == like.adventure_id;
    });
    if (adventureToUnlike) {
      adventureToUnlike.current_user_save = undefined;
      ListStore.emit(LIST_CHANGE);
      
    }
  };

  var _deleteList = function(list) {
    _list = {};
    ListStore.emit(LIST_DELETED, list.user_id)
  }


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

    addListDeletedListener: function(callback) {
      this.addListener(LIST_DELETED, callback)
    },

    removeListDeletedListener: function(callback) {
      this.addListener(LIST_DELETED, callback)
    },

    dispatcherId: AppDispatcher.register(function(action){
      switch (action.actionType) {
        case ListConstants.LIST_RECIEVED:
          _updateList(action.payload);
          break;
        case AdventureLikeConstants.LIKE_CREATED:
          _addLike(action.payload);
          break;
        case AdventureLikeConstants.LIKE_DELETED:
          _removeLike(action.payload);
          break;
        case ListConstants.LIST_DELETED:
          _deleteList(action.payload);
        default:
          break;
      }
    })

  });


})(this)