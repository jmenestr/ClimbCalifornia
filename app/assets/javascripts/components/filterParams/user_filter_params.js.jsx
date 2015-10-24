(function(root){
  root.UserFilterParams = React.createClass({

    getInitialState: function() {
      return ({ 
        activities: ActivityStore.all(),
        activityFilter: UserFilterParamsStore.allParams(),
        name: ""
         });
    },

    componentDidMount: function() {
      UserFilterParamsStore.addFilterChangeEventListener(this._handleFilterChange);
      ActivityStore.addActivityChangeListener(this._handleActivityChange);
      FilterActions.recieveUserNameToFilter("");
      ApiUtils.fetchActivities();
    },

    componentWillUnmount: function() {
      UserFilterParamsStore.removeFilterChangeEventListener(this._handleFilterChange);
      ActivityStore.removeActivityChangeListener(this._handleActivityChange);
    },

    _handleFilterChange: function() {
      this.setState({ 
        activityFilter: UserFilterParamsStore.allParams(),
        name: UserFilterParamsStore.name() })
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

    _handleNameSearch: function(e) {
      FilterActions.recieveUserNameToFilter(e.target.value)
    },

    render: function() {
      var activities = this.state.activities;
      return (
        <div>   
          <div className="search-group" >
          <label><i className="fa fa-search fa-1x"></i></label>
            <input className={'search-input'} 
            onChange={this._handleNameSearch}
            type="search" placeholder={'Search by Name'}  />
          </div>
          {activities.map(function(activity){
            var checked = this.state.activityFilter[activity.id] ? true : false
            return (
              <div className='checkbox user-filter'
                onClick={this._handleChange.bind(null, activity)} >
                <input type ='checkbox'
                key={activity.id} 
                value={activity.id} 
                checked={checked} />
                <span>{activity.name}</span>
                 <br />
              </div>)
          }.bind(this))}
        </div>
        )
        
    }

  });
})(this)