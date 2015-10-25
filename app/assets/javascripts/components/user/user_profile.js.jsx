(function(root){
  root.UserProfile = React.createClass({

    getInitialState: function() {
      return({ 
        currentUser: UserStore.currentUser(),
        savedAdventures: UserStore.savedAdventures(),
        userAdventures: UserStore.userAdventures(),
        userLists: UserStore.userLists(),
        activePageIdx: 0 })
    },

    componentDidMount: function() {
      UserStore.addCurrentChangeEventListener(this._handleUserChange);
      ListStore.addChangeListener(this._handleListChange);
      ApiUtils.fetchUser(this.props.params.id);
    },

    componentWillUnmount: function() {
      UserStore.removeCurrentChangeEventListener(this._handleUserChange);
      ListStore.removeChangeListener(this._handleListChange);
    },

    componentWillReceiveProps: function(nextProps) {
      ApiUtils.fetchUser(nextProps.params.id);
    },

    _handleUserChange: function() {
      this.setState({ 
        currentUser: UserStore.currentUser(),
        savedAdventures: UserStore.savedAdventures(),
        userLists: UserStore.userLists(),
        userAdventures: UserStore.userAdventures() 
      });
    },

    _handleListChange: function() {
      ApiUtils.fetchUser(this.props.params.id);
    },

    _handleToggle: function(idx) {
      this.setState({ activePageIdx: idx})
    },

    renderLoading: function() {
      return(
        <div className='loading'>
          <h3> Climb this Rock while we load your page </h3>
          <img src='http://sajasadr.persiangig.com/image/climbing.gif' />
        </div>
        )
    },

    _zeroSavedAdventures: function() {
      var message;
        message = (
        <div className="find-adventure-message jumbotron">
          <h2>Looks like you haven't saved any adventures yet! We can help you fix that.</h2>
          <p><Link to='/' className="btn btn-success btn-lg" role="button">Discover Adveture</Link></p>
        </div>
        );
      return message;
    },

    _zeroCreatedAdventures: function() {
      var message;
      message = (
        <div className="create-adventure-message jumbotron">
          <h2>You must be new. We see you haven't created an adventure yet. We can help. </h2>
          <p><Link to='/adventures/new' className="btn btn-success btn-lg" role="button">Create an adventure</Link></p>
        </div>
        );
      return message;
    },

    displayFollow: function() {
      if (window.CURRENT_USER.id !== this.state.currentUser.id) {
           return (<UserFollowButton 
                  user_id={this.state.currentUser.id}
                  current_user_follow={this.state.currentUser.current_user_follow} />);
      } else {
        return "";
      }
    },

    _renderContent: function() {
      var listGroup = "list-group-item ";
      var active = "list-group-item-success";
      var pageIdx = this.state.activePageIdx;
      var btn = this.displayFollow();
      return (
        <div className='user-profile'>
            <div className="row profile-head">
              <div className='page-header'>
                <img src={this.state.currentUser.profile_pic} className='profile_pic' />
                <h1>{this.state.currentUser.name}</h1>
              </div>
                {btn}
            </div>

            <div className='profile-content cf'>
              
                <div className='user-show-nav'>
                  <div className="list-group">
                    <a 
                    onClick={this._handleToggle.bind(null,0)}
                    className={listGroup + (pageIdx == 0 ? active : "")}>
                      Saved<br /> Adventures
                      <span className='badge'>
                      {this.state.savedAdventures.length}</span>
                    </a>
                    <a className={listGroup + (pageIdx == 1 ? active : "")}
                    onClick={this._handleToggle.bind(null,1)}>
                      Created<br /> Adventures
                      <span className='badge'>
                      {this.state.userAdventures.length}</span>
                    </a>
                    <a
                    onClick={this._handleToggle.bind(null,2)}
                     className={listGroup + (pageIdx == 2 ? active : "")}>
                      Lists
                      <span className='badge'>{this.state.userLists.length}</span>
                    </a>
                  </div>
                </div>
                <div className='user-adventures'>
                  {this._switchContent()}
                </div>
            </div>
          </div>
        )
    },

    _reanderUserSaves: function() {

    },

    _renderUserAdventures: function() {

    },


    _switchContent: function() {
      var content;
      switch (this.state.activePageIdx) {
        case 0: 
          if (this.state.savedAdventures.length == 0) {
            content = this._zeroSavedAdventures();
          } else {
            content = <UserAdventureIndex
              adventures={this.state.savedAdventures} />     
          }
          break;
        case 1:
        if (this.state.userAdventures.length == 0) {
            content = this._zeroCreatedAdventures();
          } else {
            content = <UserAdventureIndex
              adventures={this.state.userAdventures} />     
          }
          break;
        case 2:
          content = <UserListIndex lists={this.state.userLists} /> 
          break;
      }
      return content;
    },


    render: function() {
      var display;
      if (this.state.currentUser) {
        display = this._renderContent();
      } else {
        display = this.renderLoading();
      }
      return (
          display
        ) 

    }
  });
})(this)