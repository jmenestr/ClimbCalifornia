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
    ApiUtils.fetchList(this.props.params.id);
  },

  componentWillRecieveProps: function(nextProps) {
    ApiUtils.fetchList(nextProps.params.id);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._handleListChange);
    CurrentUserStore.removeCurrentUserChangeListener(this._handleCurrentUserChange);
    ListStore.removeListDeletedListener(this._handleListDelete);

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

  _renderContent: function() {
    debugger;
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
          <Link className='back-link' to={'users/' + this.state.list.author.id}>Back to User </Link>
          {deleteButton}
          <div className='adventure-image-viewer'>
            <ImageViewer images={this.state.list.images} />
          </div>
        </div>
        <div className='list-adventures cf'>
          <h3> List Adventures </h3>
          <ListAdventureIndex list_id={this.state.list.id} adventures={this.state.list.adventures} />
        </div>
      </div>
      )

  },

  render: function() {
    var display = (!this.state.list) ? this._renderLoad() : this._renderContent()
    return (display)
  }
 })
})(this)






