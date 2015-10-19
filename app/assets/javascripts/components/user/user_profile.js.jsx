(function(root){
  root.UserProfile = React.createClass({

    getInitialState: function() {
      return({ 
        currentUser: UserStore.currentUser(),
        savedAdventures: UserStore.savedAdventures(),
        userAdventures: UserStore.userAdventures(),
        activePageIdx: 0 })
    },

    componentDidMount: function() {
      UserStore.addCurrentChangeEventListener(this._handleUserChange);
      ApiUtils.fetchCurrentUser(this.props.params.id);
    },

    componentWillUnmount: function() {
      UserStore.removeCurrentChangeEventListener(this._handleUserChange)
    },

    componentWillReceiveProps: function(nextProps) {
      ApiUtils.fetchCurrentUser(nextProps.params.id);
    },

    _handleUserChange: function() {
      this.setState({ 
        currentUser: UserStore.currentUser(),
        savedAdventures: UserStore.savedAdventures(),
        userAdventures: UserStore.userAdventures() 
      });
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

            <div className='profile-content'>
              <div className='row'>
                <div className='col-md-3'>
                  <div className="list-group">
                    <a 
                    onClick={this._handleToggle.bind(null,0)}
                    className={listGroup + (pageIdx == 0 ? active : "")}>
                      Saved Adventures
                      <span className='badge'>
                      {this.state.savedAdventures.length}</span>
                    </a>
                    <a className={listGroup + (pageIdx == 1 ? active : "")}
                    onClick={this._handleToggle.bind(null,1)}>
                      Your Adventures
                      <span className='badge'>
                      {this.state.userAdventures.length}</span>
                    </a>
                    <a
                    onClick={this._handleToggle.bind(null,2)}
                     className={listGroup + (pageIdx == 2 ? active : "")}>
                      Your Lists
                      <span className='badge'>54</span>
                    </a>
                  </div>
                </div>
                <div className='col-md-8'>
                  {this._switchContent()}
                </div>
              </div>
            </div>
          </div>
        )
    },


    _switchContent: function() {
      var content;
      switch (this.state.activePageIdx) {
        case 0: 
          content = <UserAdventureIndex
            savedAdventures={true}
            adventures={this.state.savedAdventures} />
          break;
        case 1:
          content = <UserAdventureIndex adventures={this.state.userAdventures} />
          break;
        case 2:
          content = <h1>List goes Here </h1>
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