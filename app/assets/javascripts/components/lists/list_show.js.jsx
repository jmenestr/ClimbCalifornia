(function(root){
 root.ListShow = React.createClass({
  getInitialState: function() {
    return ({ list: undefined })
  },

  componentDidMount: function() {
    ListStore.addChangeListener(this._handleListChange);
    ApiUtils.fetchList(this.props.params.id);
  },

  componentWillRecieveProps: function(nextProps) {
    ApiUtils.fetchList(nextProps.params.id);
  },

  componentWillUnmont: function() {
    ListStore.removeChangeListener(this._handleListChange);
  },

  _handleListChange: function() {
    this.setState({ list: ListStore.list() })
  },

  _renderLoad: function() {
    return (<div>Loading</div>)
  },

  _renderContent: function() {
    return (
      <div className='container-fluid list-show'>
        <div className='row header'>
          <h2>{this.state.list.title}</h2>
          <h5>by: {this.state.list.author.name}</h5>
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






