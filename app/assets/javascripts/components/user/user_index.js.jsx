(function(root){
  root.UserIndex = React.createClass({
    getInitialState: function() {
      return ({ users: UserStore.all() })
    },

    componentDidMount: function() {
      UserStore.addUsersChangeEventListener(this._handleUsersChange);
    },

    _handleUsersChange: function() {
      this.setState({ users: UserStore.all() })
    },
    
    render: function() {
      return (<h1>User Index</h1>)
    }
  })
})(this)