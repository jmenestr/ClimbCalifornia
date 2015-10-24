(function(root){

  var ERRORS_CHANGED = "ERRORS_CHANGED";
  var _errors = [];

  var _updateErrors = function(errors) {
    _errors = errors; 
    ErrorStore.emit(ERRORS_CHANGED)
  };

  var _clearErrors = function() {
    _errors = [];
  };

  root.ErrorStore = _.extend({}, EventEmitter.prototype, {

    all: function() {
      return _errors;
    },

    addErrorsChangeListener: function(callback) {
      this.addListener(ERRORS_CHANGED, callback);
    },

    removeErrorsChangeListener: function(callback) {
      this.removeListener(ERRORS_CHANGED, callback)
    },

    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case ErrorConstants.ERRORS_RECEIVED:
          _updateErrors(action.payload);
          ErrorStore.emit(ERRORS_CHANGED);
          _clearErrors();
          break;
        default:
          break;
      }
    })

  });


})(this)