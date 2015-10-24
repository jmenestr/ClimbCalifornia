ApiUtils = {
  fetchAllAdventures: function(filters, page) {
    var searchFilters = {
      positionBounds: filters.mapBounds,
      features: _.keys(filters.featureFilter),
      activities: _.keys(filters.activityFilter)
    };

    $.getJSON(
      '/api/adventures',
       {filters: searchFilters, page: page },
       ApiActions.recieveManyAdventures);

      },

    fetchUserFeed: function() {
      $.getJSON(
        '/api/feed',
        ApiActions.recieveUserFeed
        );
    },

    createAdventure: function(adventure, images) {
      $.ajax({
        type: "POST",
        url: '/api/adventures',
        data: { adventure: adventure, images: images },
        success: function(response) {
          var url = 'adventures/' + response.id
          location.href = url;
        },
        error: function(errors) {
          ApiActions.receiveErrors(errors.responseJSON);
        }
          })
    },

    fetchUser: function(id) {
      var url = "/users/" + id;
      $.getJSON(
        url,
        ApiActions.recieveUser
        )
    },

    fetchCurrentUser: function() {
      var url = '/api/current' ;
      $.getJSON(
        url,
        ApiActions.recieveCurrentUser
        )
    },

    updateCurrentUser: function(currentUser, image) {
      var url = '/users/edit'
      $.post(
        url,
        { _method: "PATCH", user: currentUser, image_url: image},
        ApiActions.updateCurrentUser
        )
    },

    fetchAllUsers: function(name, activities) {
      var url = "/users";
      $.getJSON(
        url,
        { name: name, activities: activities },
        ApiActions.recieveUsers
        )
    },

    fetchReviews: function(adventure_id) {
      var url = '/api/adventures/' 
        + adventure_id
        + "/reviews"
      $.getJSON(
        url,
        ApiActions.recieveReviews
        )
    },

    createAdventureSave: function(adventure_id) {
      var url ='/api/adventure_likes';
      var data = { adventure_id: adventure_id}
      $.post(
        url,
        {adventure_like: data},
        ApiActions.adventureSaveCreated
        )
    },

    deleteAdventureSave: function(save_id) {
      var url ='/api/adventure_likes/' + save_id;
      $.post(
        url,
        { _method: "delete" },
        ApiActions.adventureSaveDeleted
        )
    },

    createUserFollow: function(user_id) {
      var url = '/api/follows';
      $.post(
        url,
        {user_id: user_id},
        ApiActions.userFollowCreated
        )
    },

    deleteUserFollow: function(follow_id) {
      var url = '/api/follows/' + follow_id;
      $.post(
        url,
        { _method: 'delete', id: follow_id },
        ApiActions.userFollowDeleted
        )
    },

    createReview: function(review) {
      var url ='/api/reviews'
      $.post(
        url,
        { review: review },
        ApiActions.recieveReview
        )
    },

    createList: function(name) {
      var url = 'api/lists';
      var newList = { title: name }
      $.post(
        url,
        {list: newList },
        ApiActions.listCreated
        )

    },

    deleteList: function(list_id) {
      var url ='/api/lists/' + list_id;
      $.post(
        url,
        { _method: "DELETE", list_id: list_id},
        ApiActions.listDeleted
        )
    },

    createListItems: function( adventure_id, list_ids) {
      var listItem = {list_ids: list_ids, adventure_id: adventure_id};
      var url = "/api/adventures/" + adventure_id;
      $.post(
        url,

        { "_method": "PATCH", adventure: {list_ids: list_ids}, id: adventure_id },
        ApiActions.ListItemsCreated
        )
    },

    deleteListItem: function(list_id, adventure_id) {
      var url ='/api/adventure_lists/' + list_id;
      $.post(
        url,
        { _method: "DELETE", list_id: list_id, adventure_id: adventure_id},
        ApiActions.listItemDeleted
        )
    },


    fetchList: function(id) {
      var url = 'api/lists/' + id;
      $.getJSON(
        url,
        { id: id },
        ApiActions.listReceived
        )
    },

    fetchSingleAdventure: function(id) {
      var url = '/api/adventures/' + id;
      $.getJSON(
        url,
        { id: id },
        ApiActions.recieveSingleAdventure
        )
    },

    fetchFeatures: function() {
      $.getJSON(
        '/api/features',
        ApiActions.recieveFeatures
        );
    },

    fetchActivities: function() {
      $.getJSON(
        '/api/activities',
        ApiActions.recieveActivities
        );
    },

    createFeature: function(feature) {
      $.post(
        '/api/features',
        { feature: feature},
        ApiActions.recieveFeature
        );
    },

    guestLogin: function() {
      $.post(
        '/session',
        { user: { email: 'justin', password: 'password'}}
        );
    }


  }
  
