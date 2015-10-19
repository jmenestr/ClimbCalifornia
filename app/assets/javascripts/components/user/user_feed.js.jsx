(function(root){



  root.UserFeed = React.createClass({

    getInitialState: function() {
      return ({ userFeed: [] })
    },

    componentDidMount: function() {
      UserFeedStore.addChangeEventListener(this._handleFeedChange);
      ApiUtils.fetchUserFeed();
    },

    componentWillUnmount: function() {
      UserFeedStore.removeChangeEventListener(this._handleFeedChange);
    },

    _handleFeedChange: function() {
      this.setState({ userFeed: UserFeedStore.all() });
    },

    render: function() {
      return (
        <div className='user-feed'>
          {this.state.userFeed.map(function(adventure){
            return <AdventureIndexItem adventure={adventure} key={adventure.id} />
          })}
        </div>
        )
    }
  })
})(this)