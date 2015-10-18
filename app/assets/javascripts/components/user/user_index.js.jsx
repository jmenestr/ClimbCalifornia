(function(root){
  root.UserIndex = React.createClass({
    getInitialState: function() {
      return ({ users: UserStore.all() })
    },

    componentDidMount: function() {
      UserStore.addUsersChangeEventListener(this._handleUsersChange);
      ApiUtils.fetchAllUsers();
    },

    _handleUsersChange: function() {
      this.setState({ users: UserStore.all() })
    },

    render: function() {
      return (
        <div className='user-index'>
          <div className='row explorer-header'>
            <img src='http://res.cloudinary.com/climb-california/image/upload/c_scale,w_1774/v1445137813/20140726_123058_n0r5tf.jpg' />
          </div>
          <div className='container-fluid'>
            <div className='col-sm-2'>
              <UserSearch />
            </div>
            <div className='col-sm-10'>
            {this.state.users.map(function(user){
              return <UserIndexItem user={user} />
            })}
            </div>
          </div>
        </div>
        )
    }
  })
})(this)