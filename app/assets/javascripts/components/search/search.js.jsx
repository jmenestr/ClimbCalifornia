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
      <div className={'fluid-container'}>
          <div className="row" >
            <div className="search-params col-md-5" >
              <form>
                <input className={'maps-auto form-control'} type="text" placeholder={'Search for an Area'} ref={"maps_autocomplete"} />
              </form>
            </div>
            <div className={"col-md-7"} >
              <FilterParams />
            </div>
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