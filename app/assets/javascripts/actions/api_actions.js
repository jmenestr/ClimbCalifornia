var ApiActions = {
  recieveManyAdventures: function(adventures) {
    var action = {
      actionType: AdventureConstants.ADVENTURES_RECIEVED,
      payload: adventures
    }
    AppDispatcher.dispatch(action);
  },

  recieveSingleAdventure: function(adventure) {
    var action = {
      actionType: AdventureConstants.ADVENTURE_RECIEVED,
      payload: adventure
    }
    AppDispatcher.dispatch(action);
  },


  recieveReviews: function(reviews) {
    var action = {
      actionType: ReviewConstants.REVIEWS_RECIEVED,
      payload: reviews
    };
    AppDispatcher.dispatch(action);
  },

  recieveReview: function(review) {
    var action = {
      actionType: ReviewConstants.REVIEW_RECIEVED,
      payload: review
    };
    AppDispatcher.dispatch(action);
  },

  recieveFeatures: function(features) {
    var action = {
      actionType: FeatureConstants.FEATURES_RECIEVED,
      payload: features
    }
    AppDispatcher.dispatch(action);
  },

  recieveFeature: function(feature) {
    var action = {
      actionType: FeatureConstants.FEATURE_CREATED,
      payload: feature
    };
    AppDispatcher.dispatch(action);
  }
}

