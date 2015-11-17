var ApiActions = {

  recieveCurrentUser: function(currentUser) {
    var action = {
        actionType: UserConstants.CURRENT_USER_RECEIVED,
        payload: currentUser
      };
      AppDispatcher.dispatch(action)
  },

  updateCurrentUser: function(currentUser) {
    var action = {
      actionType: UserConstants.CURRENT_USER_EDITED,

      payload: currentUser
    };
    location.href = '#/users/' + currentUser.id;
    AppDispatcher.dispatch(action);
  },

  recieveUser: function(user) {
    var action = {
      actionType: UserConstants.USER_RECIEVED,
      payload: user
    };
    AppDispatcher.dispatch(action);
    console.log(user);
  },

  recieveUsers: function(users) {
    var action = {
      actionType: UserConstants.USERS_RECEIVED,
      payload: users
    };
    AppDispatcher.dispatch(action)
  },

  recieveUserFeed: function(feed) {
    var action = { 
      actionType: UserFeedConstants.FEED_RECEIVED,
      payload: feed
    };
    AppDispatcher.dispatch(action)
  },

  listItemDeleted: function(list_item) {
    var action = {
      actionType: ListConstants.LIST_ITEM_DELETED,
      payload: list_item
    }
    AppDispatcher.dispatch(action)
  },

  ListItemsCreated: function(response) {
    var action = {
      actionType: ListConstants.LIST_ITEMS_CREATED,
      payload: response 
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

  adventureCreated: function(adventure) {
    var action = {
      actionType: AdventureConstants.ADVENTURE_CREATED,
      payload: adventure
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

  listCreated: function(list) {
    var action = {
      actionType: ListConstants.LIST_CREATED,
      payload: list
    }
    AppDispatcher.dispatch(action);
  },

  listDeleted: function(list) {
    var action = {
      actionType: ListConstants.LIST_DELETED,
      payload: list
    }
    AppDispatcher.dispatch(action);
  },

  listReceived: function(list) {
    var action = {
      actionType: ListConstants.LIST_RECIEVED,
      payload: list
    }

    AppDispatcher.dispatch(action)
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
    },

    receiveErrors: function(errors) {
      var action = {
        actionType: ErrorConstants.ERRORS_RECEIVED,
        payload: errors
      };
      AppDispatcher.dispatch(action)

    },

    clearErrors: function() {
      var action = {
        actionType: ErrorConstants.ERRORS_CLEARED
      };
      AppDispatcher.dispatch(action);
    }


}

