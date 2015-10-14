ApiUtils = {
  fetchAllAdventures: function(filters) {
    $.getJSON(
      '/api/adventures',
       {filters: filters },
       ApiActions.recieveManyAdventures);
      }
    }
  
