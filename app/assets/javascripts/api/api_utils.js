ApiUtils = {
  fetchAllAdventures: function(filters) {
    $.getJSON(
      '/api/adventures',
       {filters: filters },
       ApiActions.recieveManyAdventures);
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

    createAdventure: function(adventure, images) {
      $.post(
        '/api/adventures',
        { adventure: adventure, images: images },
        function(result) {
          console.log(result);
        })
    }

  }
  
