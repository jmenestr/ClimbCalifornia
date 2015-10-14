(function(root){
  var FEATURES_CHANGE = "FEATURES_CHANGE";

  var _features = [];

  var _updateAllFeatures = function(features) {
    _features = features;
    FeatureStore.emit(FEATURES_CHANGE)
  }

  var _addFeature = function(feature) {
    _features.push(feature)
  }

  root.FeatureStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _features;
    },

    currentAdventure: function() {
      return _currentAdventure;
    },

    addFeatureChangeListener: function(callback) {
      this.addListener(FEATURES_CHANGE, callback);
    },

    removeFeatureChangeListener: function(callback) {
      this.removeListener(FEATURES_CHANGE, callback);
    },

    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case FeatureConstants.FEATURES_RECIEVED:
          _updateAllFeatures(action.payload);
          break;
        case FeatureConstats.FEATURE_CREATED:
          _addFeature(action.payload);
          break;
        default:
          break;
      }
    })
  });
})(this)