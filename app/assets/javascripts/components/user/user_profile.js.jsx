(function(root){
  root.UserProfile = React.createClass({

    getInitialState: function() {
      return({ currentUser: CurrentUserStore.all()})
    },

    componenetDidMount: function() {
      CurrentUserStore.addChangeEventListener(this._handleUserChange)
    },

    componenetDidMount: function() {
      CurrentUserStore.removeChangeEventListener(this._handleUserChange)
    },


    render: function() {
      return (
        <div>
          <h1>User Profile</h1>
          {this.props.children}
          </div>
        )

    }
  });
})(this)