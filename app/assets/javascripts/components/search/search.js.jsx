(function(root){
  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function() {
      // debugger;
      return { filters: FilterParamsStore.allParams() }
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

    render: function() {
      var selectedFeatures = this.state.filters.featureFilter;
      var selectedKeys = _.keys(selectedFeatures);
      return (
      <div className={'fluid-container'}>
          <div className="row" >
            <div className="search-params col-md-5" >
              <form>
                <input className={'maps-auto form-control'} type="text" placeholder={'Search for an Area'} ref={"maps_autocomplete"} />
              </form>
            </div>
            <form className={"col-md-7"} >
              <FilterParams />
            </form>
          </div>

          <div className='row'>
            <h4>Selected Features</h4>
            <p>
              {selectedKeys.map(function(id){
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
          </div>

          <div className='search-results row'>
            <div className="adventure-index col-md-7" >
              <AdventureIndex adventures={this.state.adventures}  />
            </div>
            <div className='search-map col-md-5'>
              <SearchMap placesSearch={this.autocomplete} />
            </div>
          </div>
        </div>
        )
    }
  }) 
})(this)