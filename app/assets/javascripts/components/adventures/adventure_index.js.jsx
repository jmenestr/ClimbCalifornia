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
            <AdventureIndexItem adventure={adventure} key={adventure.id} />
            );
        });
        return (
        <div className={"cf row"} >
            {adventures}
        </div>
        );
    }
  });
})(this)