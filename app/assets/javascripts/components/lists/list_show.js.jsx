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
    ListStore.addListDeletedListener(this._handleListDelete);
    ApiUtils.fetchList(this.props.params.id);
  },

  componentWillRecieveProps: function(nextProps) {
    ApiUtils.fetchList(nextProps.params.id);
  },

  componentWillUnmont: function() {
    ListStore.removeChangeListener(this._handleListChange);
    ListStore.removeListDeletedListener(this._handleListDelete);

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
    var deleteButton = this.state.current_user.id == this.state.list.author.id ? 
      (<DeleteListButton list_id={this.state.list.id} />) : ""
    return (
      <div className='container-fluid list-show'>
        <div className='row header'>
          <h2>{this.state.list.title}</h2>
          <h5>by: <Link to={'users/' + this.state.list.author.id}>
          {this.state.list.author.name}</Link></h5>
          {deleteButton}
        </div>
        <div className='list-adventures row'>
          <ListAdventureIndex adventures={this.state.list.adventures} />
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






