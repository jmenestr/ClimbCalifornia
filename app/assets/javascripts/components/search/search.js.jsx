(function(root){
  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function() {
      // debugger;
      return { bounds: FilterParamsStore.allParams() }
    },

    componentDidMount: function() {
      this.autocomplete =  React.findDOMNode(this.refs.maps_autocomplete);
      FilterParamsStore.addFilterChangeEventListener(this._handleChange);
      this.setState({ bounds: FilterParamsStore.allParams() });
    },

    componentWillUnmount: function() {
      FilterParamsStore.removeFilterChangeEventListener(this._handleChange);
    },

    _handleChange: function() {
      var currentBounds = FilterParamsStore.allParams();
      ApiUtils.fetchAllAdventures(currentBounds);
      this.setState( { bounds: currentBounds});
    },

    render: function() {
      console.log("Search Render")
      return (
        <div>
          <input className={'maps-auto'} type="text" placeholder={'Search for an Area'} ref={"maps_autocomplete"} />
          <FilterParams />
          <div className='row'>
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