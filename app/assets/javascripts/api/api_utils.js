ApiUtils = {
  fetchAllAdventures: function(filters) {
    $.getJSON(
      '/api/adventures',
       {filters: filters },
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
  
