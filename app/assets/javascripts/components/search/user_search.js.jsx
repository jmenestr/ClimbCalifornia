(function(root){
  root.UserSearch = React.createClass({
    getInitialState: function() {
      return { 
        activities: UserFilterParamsStore.allParams(),
        name: UserFilterParamsStore.name() }
    },

    componentDidMount: function() {
      UserFilterParamsStore.addFilterChangeEventListener(this._handleChange);
      // this.setState({ activities: UserFilterParamsStore.allParams() });
    },

    componentWillUnmount: function() {
      UserFilterParamsStore.removeFilterChangeEventListener(this._handleChange);
    },

    _handleChange: function() {
      var currentFilters = UserFilterParamsStore.allParams();
      var name = UserFilterParamsStore.name();
      var activityKeys = _.keys(currentFilters);
      ApiUtils.fetchAllUsers(name, activityKeys);
      this.setState( { name: name, activities: currentFilters});
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