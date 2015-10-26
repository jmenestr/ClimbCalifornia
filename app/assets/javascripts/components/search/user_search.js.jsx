(function(root){
  root.UserSearch = React.createClass({
    getInitialState: function() {
      return { 
        activities: UserFilterParamsStore.allParams(),
        page: UserFilterParamsStore.page(),
        name: UserFilterParamsStore.name()  }
    },

    componentDidMount: function() {
      UserFilterParamsStore.addFilterChangeEventListener(this._handleChange);
      var name = UserFilterParamsStore.name();
      var activityKeys = _.keys(UserFilterParamsStore.allParams());
      var page = UserFilterParamsStore.page();
      ApiUtils.fetchAllUsers(name, activityKeys, page);
      // this.setState({ activities: UserFilterParamsStore.allParams() });
    },

    componentWillUnmount: function() {
      UserFilterParamsStore.removeFilterChangeEventListener(this._handleChange);
    },

    _handleChange: function() {
      var currentFilters = UserFilterParamsStore.allParams();
      var name = UserFilterParamsStore.name();
      var activityKeys = _.keys(currentFilters);
      var page = UserFilterParamsStore.page();
      ApiUtils.fetchAllUsers(name, activityKeys, page);
      this.setState( { name: name, activities: currentFilters, page: page});
    },

    render: function() {
      return (
            <div className='user-search'>
                <UserFilterParams />
            </div>
        )
    }
  }) 
})(this)