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
      ActivityStore.REMOVEActivityChangeListener(this._handleActivityChanges);
      FeatureStore.removeFeatureChangeListener(this._handleFeatureChanges);
    },

    _handleFeatureChanges: function() {
      this.setState({ features: FeatureStore.all() })
    },
    _handleActivityChanges: function() {
      his.setState({ activities: ActivityStore.all() })
    },

    _handleSelect:function(e) {
      var option = e.target.selectedOptions[0];
      var feature = { id: option.value, name: option.text}
      FilterActions.recieveFeatureToFilter(feature);
    },

    render: function() {
      return (
        <div clasName='col-md-4'>
          <div className='form-group'>
            <label htmlFor='features'>Features  </label> 
            <select id='features' onChange={this._handleSelect} className='form-control'  >
              {this.state.features.map(function(feature){
                return (<option value={feature.id} >{feature.name}</option>);
              })}
            </select>
          </div>
        </div>
        );
    }
  })
})(this)