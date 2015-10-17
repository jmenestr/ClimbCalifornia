(function(root){
  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function() {
      return { 
        filters: FilterParamsStore.allParams(),
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
      ApiUtils.fetchAllAdventures(currentFilters);
      this.setState( { filters: currentFilters});
    },

    _removeFeature: function(e) {
      FilterActions.removeFeatureToFilter(e.target.getAttribute('data-id'));
    },

    _removeActivity: function(e) {
      FilterActions.removeActivityToFilter(e.target.getAttribute('data-id'));
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
          <div className="row" >
            <div className="search-params form-inline" >
              <form>
                <input className={'maps-auto form-control'} type="text" placeholder={'Search for an Area'} ref={"maps_autocomplete"} />
                <FilterParams />
            </form>
          </div>
          </div>

          <div className='row'>
            <h4>Selected Features</h4>
            <p>
              {selectedFeatureKeys.map(function(id){
                return (
                <button 
                data-id={id}
                onClick={this._removeFeature} 
                key={id} 
                className='btn btn-primary'>
                  {selectedFeatures[id]}
                </button>
                  );
              }.bind(this))}
            </p>
            <h4>Selected Activities</h4>
            <p>
              {selectedActivityKeys.map(function(id){
                return (
                <button 
                data-id={id}
                onClick={this._removeActivity} 
                key={id} 
                className='btn btn-primary'>
                  {selectedActivities[id]}
                </button>
                  );
              }.bind(this))}
            </p>
          </div>

          <div className='search-results row'>
            <div className="adventure-index col-md-7" >
              <AdventureIndex
                handleMouseOver={this._handleMouseOver}
                handleMouseOut={this._handleMouseOut} 
                adventures={this.state.adventures}  />
            </div>
            <div className='search-map col-md-5'>
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