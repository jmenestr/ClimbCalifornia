(function(root){

  var MAX_PER_PAGE = 10;
  root.UserIndex = React.createClass({
    getInitialState: function() {
      return ({ 
        users: UserStore.all(),
        page: UserFilterParamsStore.page(),
        moreUsers: true
         })
    },

    componentDidMount: function() {
      UserStore.addUsersChangeEventListener(this._handleUsersChange);
      UserFilterParamsStore.addFilterChangeEventListener(this._filterChange);
    },

    componentWillUnmount: function() {
      UserStore.removeUsersChangeEventListener(this._handleUsersChange);
      UserFilterParamsStore.removeFilterChangeEventListener(this._filterChange);
    },

    _filterChange: function() {
      this.setState({page: UserFilterParamsStore.page()});
    },

    _handleUsersChange: function() {
      this.setState({ users: UserStore.all() })
    },
    handlePagination: function(page) {
      FilterActions.recieveUserPage(page);
    },

    render: function() {
    var lessMaxUsers = (this.state.users.length < MAX_PER_PAGE);
     var pages;
     if (this.state.page == 1 && lessMaxUsers) {
      pages = "";
     } else {
      pages = (<Pagination 
        handlePagination={this.handlePagination} 
        page={this.state.page} 
        morePages={!lessMaxUsers} /> )
     }
      return (
        <div>
          <div className='row explorer-header'>
            <h3> Find Explorers Like You! </h3>
            <img src='http://res.cloudinary.com/climb-california/image/upload/v1445449929/904113_10151963934472735_691245184723702402_o_mkkktt.jpg' />
          </div>
          <div className='user-container'>         
            <UserSearch />
            <div className='user-index'>
              <div className='user-index-masonry'>
              {this.state.users.map(function(user){
                return <UserIndexItem user={user} key={user.id} />
              })}
              </div>
              <div className='row'>
                {pages}
              </div>
            </div>
          </div>
        </div>
        )
    }
  })
})(this)