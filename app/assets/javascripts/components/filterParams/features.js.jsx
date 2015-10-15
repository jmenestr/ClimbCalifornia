(function(root) {
  FeatureList = React.createClass({
    getInitialState: function() {
      return { features: FeatureStore.all()}
    },
    componentDidMount: function() {
      FeatureStore.addFeatureChangeListener(this._recieveFeatures)
    },
    componentWillUnmount: function() {
      FeatureStore.removeFeatureChangeListener(this._recieveFeatures.bind(this));
    },

    _recieveFeatures: function() {
      this.setState({ features: FeatureStore.all() });
    },

    compoenentDidMount: function() {
      FeatureStore.addFeatureChangeListener(this._handleFeatureChange)
    },
    render: function() {
      return (
          <div>
            <h4>Features: </h4> 
            <select onChange={this.props._handleSelect} className='form-control' multiple={true} >
              {this.state.features.map(function(feature){
                return (<option value={feature.id} >{feature.name}</option>);
              })}
            </select>
          </div>
                );
    }

  })
})(this)