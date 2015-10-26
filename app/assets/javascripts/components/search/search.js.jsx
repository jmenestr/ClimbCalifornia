(function(root){
  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function() {
      return { 
        filters: FilterParamsStore.allParams(),
        page: FilterParamsStore.page(),
        selectedMarker: undefined }
    },

    componentDidMount: function() {
      this.autocomplete =  React.findDOMNode(this.refs.maps_autocomplete);
      FilterParamsStore.addFilterChangeEventListener(this._handleChange);
      this.setState({ filters: FilterParamsStore.allParams() });
    },

    componentWillUnmount: function() {
      FilterParamsStore.removeFilterChangeEventListener(this._handleChange);
    },

    _handleChange: function() {
      var currentFilters = FilterParamsStore.allParams();
      var page = FilterParamsStore.page();
      ApiUtils.fetchAllAdventures(currentFilters, page);
      this.setState( { filters: currentFilters, page: page });
    },

 
    clearAll: function() {
      FilterActions.clearAllTags();
    },
    
    _removeFeature: function(e) {
      FilterActions.removeFeatureToFilter(e.target.getAttribute('data-id'));
    },

    _removeActivity: function(e) {
      FilterActions.removeActivityToFilter(e.target.getAttribute('data-id'));
    },

    _clearAll: function() {
      FilterActions.clearAllTags();
    },

    _handleMouseOver: function(adventure_id) {
      this.setState({ selectedMarker: adventure_id})
    },

    _handleMouseOut: function() {
      this.setState({ selectedMarker: undefined });
    },

    render: function() {
      var selectedFeatures = this.state.filters.featureFilter;
      var selectedActivities = this.state.filters.activityFilter;
      var selectedFeatureKeys = _.keys(selectedFeatures);
      var selectedActivityKeys = _.keys(selectedActivities);
      return (
      <div className={'fluid-container'}>
        <div className='row'>
            <div className="search-params" >
              <form>
              <div className='search-group'>
                <label><i className="fa fa-search fa-1x"></i></label>
                <input className={'maps-auto search-input'} type="text" placeholder={'Search for an Area'} ref={"maps_autocomplete"} />
              </div>
                <FilterParams />
            </form>
          </div>


          <div className='tags-display panel panel-success'>
            <div className='panel-heading'>
              <h4>Filtered Tags</h4>
            </div>
            <div className='panel-body'>
            <div className='clear-all'>
              <button onClick={this.clearAll} className='btn btn-primary'>
                Clear Filter
              </button>
            </div>
            <p>
              {selectedFeatureKeys.map(function(id){
                return (
                <div 
                data-id={id}
                className='tag'
                onClick={this._removeFeature} 
                key={id} 
                >
                  {selectedFeatures[id]}
                </div>
                  );
              }.bind(this))}
              {selectedActivityKeys.map(function(id){
                return (
                <div 
                data-id={id}
                className='tag'
                onClick={this._removeActivity} 
                key={id} 
                >
                  {selectedActivities[id]}
                </div>
                  );
              }.bind(this))}
            </p>
            </div>
          </div>
        </div>
          <div className='search-results cf'>
            <div className="adventure-index" >
              <AdventureIndex
                page={this.state.page}
                handleMouseOver={this._handleMouseOver}
                handleMouseOut={this._handleMouseOut} 
                adventures={this.state.adventures}  />
            </div>
            <div className='search-map'>
              <SearchMap
               selectedMarker={this.state.selectedMarker}
               placesSearch={this.autocomplete} />
            </div>
          </div>
        </div>
        )
    }
  }) 
})(this)