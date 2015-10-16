(function(root){
  root.FilterParams = React.createClass({
    getInitialState: function() {
      return { 
        features: FeatureStore.all(),
        activities:ActivityStore.all()
      }
    }, 
    componentDidMount: function() {
      FeatureStore.addFeatureChangeListener(this._handleFeatureChanges);
      ActivityStore.addActivityChangeListener(this._handleActivityChanges);
      ApiUtils.fetchFeatures();
      ApiUtils.fetchActivities();
    },
    componentWillMount: function() {
      ActivityStore.removeActivityChangeListener(this._handleActivityChanges);
      FeatureStore.removeFeatureChangeListener(this._handleFeatureChanges);
    },

    _handleFeatureChanges: function() {
      this.setState({ features: FeatureStore.all() })
    },
    _handleActivityChanges: function() {
      this.setState({ activities: ActivityStore.all() })
    },

    _handleFeatureSelect:function(e) {
      var option = e.target.selectedOptions[0];
      var feature = { id: option.value, name: option.text}
      FilterActions.recieveFeatureToFilter(feature);
    },

    _handleActivitySelect:function(e) {
      var option = e.target.selectedOptions[0];
      var activity = { id: option.value, name: option.text}
      FilterActions.recieveActivityToFilter(activity);
    },

    render: function() {
      return (
        <div clasName='col-md-4'>
          <FilterDropDown title={'Features'} items={this.state.features} handleSelect={this._handleFeatureSelect} />
          <FilterDropDown title={'Activities'} items={this.state.activities} handleSelect={this._handleActivitySelect} />
        </div>
        );
    }
  })
})(this)