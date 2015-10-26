(function(root){
 root.ListShow = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function() {
    return ({ 
      list: undefined,
      current_user: CurrentUserStore.currentUser() })
  },

  componentDidMount: function() {
    ListStore.addChangeListener(this._handleListChange);
    CurrentUserStore.addCurrentUserChangeListener(this._handleCurrentUserChange);
    ListStore.addListDeletedListener(this._handleListDelete);
    ListStore.addListItemDeletedListener(this._handleListItemDeleted);
    ApiUtils.fetchList(this.props.params.id);
  },

  componentWillRecieveProps: function(nextProps) {
    ApiUtils.fetchList(nextProps.params.id);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._handleListChange);
    ListStore.removeListItemDeletedListener(this._handleListItemDeleted);
    CurrentUserStore.removeCurrentUserChangeListener(this._handleCurrentUserChange);
    ListStore.removeListDeletedListener(this._handleListDelete);

  },

  _handleListItemDeleted: function() {
    ApiUtils.fetchList(this.props.params.id);
  },

  _handleCurrentUserChange: function() {
    this.setState({ current_user: CurrentUserStore.currentUser() })
  },

  _handleListDelete: function(user_id) {
    var url = 'users/' + user_id;
    this.history.pushState(null, url)
  },

  _handleListChange: function() {
    this.setState({ list: ListStore.list() })
  },

  _renderLoad: function() {
    return (<div>Loading</div>)
  },

  _renderEmpty: function() {
    return (
      <div className='row'>
        <div className='jumbotron'>
          <h2>It appears as this list is lonley and empty. Find adventures to add! </h2>
          <Link to='/' className='btn btn-lg btn-success'>Discover Adventure</Link>
        </div>
      </div>
      )
  },

  _renderContent: function() {
    var content;
    if (this.state.list.images.length == 0) {
      display = this._renderEmpty();
    } else {
      display = (
      <div>
        <div className='adventure-image-viewer'>
            <ImageViewer images={this.state.list.images} />
          </div>
        <div className='list-adventures cf'>
          <h3> List Adventures </h3>
          <ListAdventureIndex list_id={this.state.list.id} adventures={this.state.list.adventures} />
        </div>
      </div>

        )
    }
    var deleteButton = this.state.current_user.id == this.state.list.author.id ? 
      (<DeleteListButton list_id={this.state.list.id} />) : ""
    return (
      <div className='container-fluid list-show'>
        <div className='row'>
          <div className='page-header'>
            <h1>{this.state.list.title}</h1>
            <h5>by: <Link to={'users/' + this.state.list.author.id}>
            {this.state.list.author.name}</Link></h5>
          </div>
          <div className='row'>
            <Link className='back-link' to={'users/' + this.state.list.author.id}>Back to User </Link>
            {deleteButton}
          </div>
          {display}
        </div>
      </div>
      )

  },

  render: function() {
    var display;
    if (!this.state.list) {
      display = this._renderLoad();
    }  else {
      display = this._renderContent();
    }
    return (display)
  }

 });

})(this)






