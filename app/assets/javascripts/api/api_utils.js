ApiUtils = {
  fetchAllAdventures: function(filters) {
    var searchFilters = {
      positionBounds: filters.mapBounds,
      features: _.keys(filters.featureFilter),
      activities: _.keys(filters.activityFilter)
    }
    $.getJSON(
      '/api/adventures',
       {filters: searchFilters },
       ApiActions.recieveManyAdventures);
      },

    createAdventure: function(adventure, images) {
      $.post(
        '/api/adventures',
        { adventure: adventure, images: images },
        function(result) {
          console.log(result);
        })
    },

    fetchCurrentUser: function(id) {
      var url = "/users/" + id;
      $.getJSON(
        url,
        ApiActions.recieveCurrentUser
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

    createReview: function(review) {
      var url ='/api/reviews'
      $.post(
        url,
        { review: review },
        ApiActions.recieveReview
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


  }
  
