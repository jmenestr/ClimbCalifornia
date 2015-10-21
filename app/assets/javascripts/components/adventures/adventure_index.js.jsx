(function(root){
  root.AdventureIndex = React.createClass({
    getInitialState: function() {
      return { adventures: AdventureStore.all() }
    },

    componentDidMount: function() {
      AdventureStore.addAllAdventuresChangeListener(this._handleChange)
    },

    componentWillUnmount: function() {
      AdventureStore.removeAllAdventuresChangeListener(this._handleChange)
    },

    _handleChange: function() {
      this.setState( { adventures: AdventureStore.all() })
    },



    render: function() {
      var adventures = this.state.adventures.map(function(adventure) {
          return (
              <AdventureIndexItem
                handleMouseOver={this.props.handleMouseOver}
                handleMouseOut={this.props.handleMouseOut} 
                adventure={adventure}  />
            );
        }.bind(this));
          
        return (
        <div className={"cf masonry"} >
            {adventures}
        </div>
        );
    }
  });
})(this)

