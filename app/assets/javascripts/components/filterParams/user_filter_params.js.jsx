(function(root){
  root.UserFilterParams = React.createClass({

    getInitialState: function() {
      return ({ 
        activities: ActivityStore.all(),
        activityFilter: UserFilterParamsStore.allParams()
         });
    },

    componentDidMount: function() {
      UserFilterParamsStore.addFilterChangeEventListener(this._handleFilterChange);
      ActivityStore.addActivityChangeListener(this._handleActivityChange);
      ApiUtils.fetchActivities();
    },

    componentWillUnmount: function() {
      UserFilterParamsStore.removeFilterChangeEventListener(this._handleFilterChange);
      ActivityStore.removeActivityChangeListener(this._handleActivityChange);
    },

    _handleFilterChange: function() {
      this.setState({ activityFilter: UserFilterParamsStore.allParams() })
    },

    _handleActivityChange: function() {
      this.setState({ activities: ActivityStore.all() });
    },

    _handleChange: function(activity) {
      if (this.state.activityFilter[activity.id]) {
        FilterActions.removeUserActivityFilter(activity.id);
      } else {
        FilterActions.recieveUserActivityToFilter(activity);
      }
    },

    render: function() {
      var activities = this.state.activities;
      return (
        <div>
          {activities.map(function(activity){
            var checked = this.state.activityFilter[activity.id] ? true : false
            return (
              <div className='form-control'>
                <input type ='checkbox' 
                onChange={this._handleChange.bind(null, activity)} 
                value={activity.id} 
                checked={checked} />
                {activity.name}
                 <br />
              </div>)
          }.bind(this))}
        </div>
        )
        
    }

  });
})(this)