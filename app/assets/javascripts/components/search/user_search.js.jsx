(function(root){
  root.UserSearch = React.createClass({
    getInitialState: function() {
      return { 
        activities: UserFilterParamsStore.allParams() }
    },

    componentDidMount: function() {
      UserFilterParamsStore.addFilterChangeEventListener(this._handleChange);
      this.setState({ activities: UserFilterParamsStore.allParams() });
    },

    componentWillUnmount: function() {
      UserFilterParamsStore.removeFilterChangeEventListener(this._handleChange);
    },

    _handleChange: function() {
      var currentFilters = UserFilterParamsStore.allParams();
      var activityKeys = _.keys(currentFilters);
      ApiUtils.fetchAllUsers(activityKeys);
      this.setState( { activities: currentFilters});
    },

    _handleNameSearch: function(e) {
      
    },

    _removeActivity: function(e) {
      FilterActions.removeActivityToFilter(e.target.getAttribute('data-id'));
    },

    render: function() {
      return (

            <div className="name-search" >
                <input className={'name-search'} 
                onChange={this._handleNameSearch}
                type="search" placeholder={'Search by Name'}  />
                <UserFilterParams />
            </div>
        )
    }
  }) 
})(this)