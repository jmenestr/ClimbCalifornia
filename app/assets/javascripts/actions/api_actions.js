var ApiActions = {

  recieveCurrentUser: function(user) {
    var action = {
      actionType: UserConstants.CURRENT_USER_RECIEVED,
      payload: user
    };
    AppDispatcher.dispatch(action)
  },

  recieveUsers: function(users) {
    var action = {
      actionType: UserConstants.USERS_RECEIVED,
      payload: users
    };
    AppDispatcher.dispatch(action)
  },

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

  recieveActivities: function(activities) {
    var action = {
      actionType: ActivityConstants.ACTIVITIES_RECIEVED,
      payload: activities
    }
    AppDispatcher.dispatch(action);
  },

  recieveFeature: function(feature) {
    var action = {
      actionType: FeatureConstants.FEATURE_CREATED,
      payload: feature
    };
    AppDispatcher.dispatch(action);
  },

    adventureSaveCreated: function(adventure_like) {
      var action = {
        actionType: AdventureLikeConstants.LIKE_CREATED,
        payload: adventure_like
      };
      AppDispatcher.dispatch(action);
    },

    userFollowCreated: function(follow) {
      var action = {
        actionType: UserFollowConstants.FOLLOW_CREATED,
        payload: follow
      };
      AppDispatcher.dispatch(action)
    },

    userFollowDeleted: function(follow) {
      var action = {
        actionType: UserFollowConstants.FOLLOW_DELETED,
        payload: follow
      };
      AppDispatcher.dispatch(action)
    },

    adventureSaveDeleted: function(adventure_like) {
      var action = {
        actionType: AdventureLikeConstants.LIKE_DELETED,
        payload: adventure_like
      }
      AppDispatcher.dispatch(action);
    }


}

