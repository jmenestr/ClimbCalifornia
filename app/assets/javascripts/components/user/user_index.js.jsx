(function(root){

  root.UserIndex = React.createClass({
    getInitialState: function() {
      return ({ 
        users: UserStore.all(),
        page: UserFilterParamsStore.page(),
        isFirstPage: UserStore.firstPage(),
        isLastPage: UserStore.lastPage(),
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
      this.setState({
        page: UserFilterParamsStore.page(),
      });
    },

    _handleUsersChange: function() {
      this.setState({ 
        users: UserStore.all(),
        isFirstPage: UserStore.firstPage(),
        isLastPage: UserStore.lastPage(), })
    },

    handlePagination: function(page) {
      FilterActions.recieveUserPage(page);
    },

    render: function() {
    
     var pages = (<Pagination 
        handlePagination={this.handlePagination} 
        page={this.state.page} 
        isFirstPage={this.state.isFirstPage}
        isLastPage={this.state.isLastPage} /> )
  
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