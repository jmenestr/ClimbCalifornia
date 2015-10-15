ApiUtils = {
  fetchAllAdventures: function(filters) {
    var searchFilters = {
      positionBounds: filters.mapBounds,
      features: _.keys(filters.featureFilter)
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

    fetchReviews: function(adventure_id) {
      var url = '/api/adventures/' 
        + adventure_id
        + "/reviews"
      $.getJSON(
        url,
        ApiActions.recieveReviews
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

    createFeature: function(feature) {
      $.post(
        '/api/features',
        { feature: feature},
        ApiActions.recieveFeature
        );
    },


  }
  
