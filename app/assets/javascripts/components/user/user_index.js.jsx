(function(root){
  root.UserIndex = React.createClass({
    getInitialState: function() {
      return ({ users: UserStore.all() })
    },

    componentDidMount: function() {
      UserStore.addUsersChangeEventListener(this._handleUsersChange);
      ApiUtils.fetchAllUsers();
    },

    componentWillUnmont: function() {
      UserStore.removeUsersChangeEventListener(this._handleUsersChange);
    },

    _handleUsersChange: function() {
      this.setState({ users: UserStore.all() })
    },

    render: function() {
      return (
        <div>
          <div className='row explorer-header'>
            <img src='http://res.cloudinary.com/climb-california/image/upload/v1445449929/904113_10151963934472735_691245184723702402_o_mkkktt.jpg' />
          </div>
          <div className='user-container'>         
            <UserSearch />
          <div className='user-index user-index-masonry'>
          {this.state.users.map(function(user){
            return <UserIndexItem user={user} key={user.id} />
          })}
          </div>
          </div>
        </div>
        )
    }
  })
})(this)